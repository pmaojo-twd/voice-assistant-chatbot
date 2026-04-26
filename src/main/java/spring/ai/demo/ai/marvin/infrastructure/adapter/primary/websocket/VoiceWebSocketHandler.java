package spring.ai.demo.ai.marvin.infrastructure.adapter.primary.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.BinaryMessage;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.BinaryWebSocketHandler;
import spring.ai.demo.ai.marvin.application.VoiceAssistantExchange;
import spring.ai.demo.ai.marvin.application.VoiceAssistantService;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class VoiceWebSocketHandler extends BinaryWebSocketHandler {

    private static final Logger log = LoggerFactory.getLogger(VoiceWebSocketHandler.class);
    private final VoiceAssistantService voiceAssistantService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // VAD Configuration
    private static final double VOLUME_THRESHOLD = 150.0; // Ajustado tras pruebas
    private static final long SILENCE_DURATION_MS = 1000; 

    private final Map<String, SessionState> sessionStates = new ConcurrentHashMap<>();
    private final java.util.concurrent.atomic.AtomicInteger logCounter = new java.util.concurrent.atomic.AtomicInteger(0);

    private static class SessionState {
        final ByteArrayOutputStream buffer = new ByteArrayOutputStream();
        boolean speechStarted = false;
        long silenceStartTime = 0;
    }

    public VoiceWebSocketHandler(VoiceAssistantService voiceAssistantService) {
        this.voiceAssistantService = voiceAssistantService;
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        log.info("WebSocket connection established: {}", session.getId());
        sessionStates.put(session.getId(), new SessionState());
    }

    @Override
    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) {
        SessionState state = sessionStates.get(session.getId());
        if (state == null) return;

        java.nio.ByteBuffer payloadBuffer = message.getPayload();
        byte[] payload = new byte[payloadBuffer.remaining()];
        payloadBuffer.get(payload);

        double rms = calculateRMS(payload);
        
        // Log cada 20 paquetes (aprox 5 seg) para monitoreo
        if (logCounter.incrementAndGet() % 20 == 0) {
            log.info("[VAD Monitor] RMS: {}, Started: {}, Buf: {}", 
                (int)rms, state.speechStarted, state.buffer.size());
        }

        if (!state.speechStarted) {
            if (rms > VOLUME_THRESHOLD) {
                state.speechStarted = true;
                log.info("[VAD] ¡Voz detectada! (RMS: {})", (int)rms);
                try {
                    Map<String, Object> msg = Map.of("status", "speech_detected", "rms", (int)rms);
                    session.sendMessage(new TextMessage(objectMapper.writeValueAsString(msg)));
                } catch (IOException e) {
                    log.warn("Failed to send notification");
                }
                state.buffer.writeBytes(payload);
            }
        } else {
            state.buffer.writeBytes(payload);
            if (rms < VOLUME_THRESHOLD) {
                if (state.silenceStartTime == 0) {
                    state.silenceStartTime = System.currentTimeMillis();
                } else if (System.currentTimeMillis() - state.silenceStartTime > SILENCE_DURATION_MS) {
                    log.info("[VAD] Silencio detectado tras {}ms de audio acumulado. Procesando...", state.buffer.size());
                    processAudio(session, state);
                }
            } else {
                state.silenceStartTime = 0;
            }
        }
    }

    private double calculateRMS(byte[] buffer) {
        long sum = 0;
        if (buffer.length < 2) return 0;
        for (int i = 0; i < buffer.length - 1; i += 2) {
            short sample = (short) ((buffer[i] & 0xFF) | ((buffer[i + 1] & 0xFF) << 8));
            sum += (long) sample * sample;
        }
        return Math.sqrt((double) sum / (buffer.length / 2));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            String payload = message.getPayload();
            log.info("Received text command: {}", payload);

            if ("CLEAR".equalsIgnoreCase(payload)) {
                resetState(session);
            } else if ("PING".equalsIgnoreCase(payload)) {
                // Keep alive
            }
        } catch (Exception e) {
            log.error("Error handling text message", e);
        }
    }

    private void processAudio(WebSocketSession session, SessionState state) {
        byte[] audioBytes = state.buffer.toByteArray();
        if (audioBytes.length == 0) return;

        log.info("Processing {} bytes of audio for session {}", audioBytes.length, session.getId());

        try {
            // Re-encode as WAV for the service (which expects a full WAV file or raw bytes with specific format)
            byte[] wavBytes = encodeWav(audioBytes, 16000); 

            VoiceAssistantExchange response = voiceAssistantService.processAudioBytesAndSynthesize(wavBytes, "audio.wav");

            Map<String, Object> result = Map.of(
                    "text", response.text(),
                    "audio", Base64.getEncoder().encodeToString(response.audio()),
                    "audioMimeType", "audio/wav",
                    "status", "success"
            );

            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(result)));
        } catch (Exception e) {
            log.error("Error processing voice in WebSocket", e);
            try {
                Map<String, String> errorMsg = Map.of("status", "error", "message", e.getMessage() != null ? e.getMessage() : "Unknown error");
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(errorMsg)));
            } catch (IOException ignored) {}
        } finally {
            resetState(session);
        }
    }

    private void resetState(WebSocketSession session) {
        SessionState state = sessionStates.get(session.getId());
        if (state != null) {
            state.buffer.reset();
            state.speechStarted = false;
            state.silenceStartTime = 0;
        }
    }

    private byte[] encodeWav(byte[] pcmData, int sampleRate) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        // WAV Header (44 bytes)
        baos.write("RIFF".getBytes());
        baos.write(intToBytes(36 + pcmData.length));
        baos.write("WAVE".getBytes());
        baos.write("fmt ".getBytes());
        baos.write(intToBytes(16)); // Subchunk1Size
        baos.write(shortToBytes((short) 1)); // AudioFormat (PCM)
        baos.write(shortToBytes((short) 1)); // NumChannels (Mono)
        baos.write(intToBytes(sampleRate));
        baos.write(intToBytes(sampleRate * 2)); // ByteRate
        baos.write(shortToBytes((short) 2)); // BlockAlign
        baos.write(shortToBytes((short) 16)); // BitsPerSample
        baos.write("data".getBytes());
        baos.write(intToBytes(pcmData.length));
        baos.write(pcmData);
        return baos.toByteArray();
    }

    private byte[] intToBytes(int i) {
        return new byte[] { (byte) (i & 0xff), (byte) ((i >> 8) & 0xff), (byte) ((i >> 16) & 0xff), (byte) ((i >> 24) & 0xff) };
    }

    private byte[] shortToBytes(short s) {
        return new byte[] { (byte) (s & 0xff), (byte) ((s >> 8) & 0xff) };
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        log.info("WebSocket connection closed: {}", session.getId());
        sessionStates.remove(session.getId());
    }
}
