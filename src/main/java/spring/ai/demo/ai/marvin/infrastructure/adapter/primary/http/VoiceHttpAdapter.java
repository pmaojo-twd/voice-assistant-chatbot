package spring.ai.demo.ai.marvin.infrastructure.adapter.primary.http;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spring.ai.demo.ai.marvin.application.VoiceAssistantExchange;
import spring.ai.demo.ai.marvin.application.VoiceAssistantService;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class VoiceHttpAdapter {

    private static final Logger FRONTEND_LOG = LoggerFactory.getLogger("frontend");

    private final VoiceAssistantService voiceAssistantService;

    public VoiceHttpAdapter(VoiceAssistantService voiceAssistantService) {
        this.voiceAssistantService = voiceAssistantService;
    }

    @GetMapping(value = "/app/voice-app.html", produces = MediaType.TEXT_HTML_VALUE)
    public String getVoiceApp() throws IOException {
        ClassPathResource resource = new ClassPathResource("app/voice-app.html");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    @GetMapping("/api/status")
    public Map<String, Object> getStatus() {
        return Map.of(
            "status", "online",
            "version", "2.0.0",
            "capabilities", List.of("STT", "TTS", "VAD", "RAG")
        );
    }

    @PostMapping(value = "/api/voice/process", consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public VoiceResponse processVoice(@RequestBody VoiceRequest request) {
        byte[] audioBytes = Base64.getDecoder().decode(request.audio());
        VoiceAssistantExchange exchange = voiceAssistantService.processAudioBytesAndSynthesize(
                audioBytes,
                filenameForMimeType(request.mimeType()));

        return new VoiceResponse(
                exchange.text(),
                Base64.getEncoder().encodeToString(exchange.audio()),
                "audio/wav",
                "success");
    }

    private String filenameForMimeType(String mimeType) {
        if (mimeType != null && mimeType.contains("webm")) {
            return "audio.webm";
        }
        if (mimeType != null && mimeType.contains("ogg")) {
            return "audio.ogg";
        }
        if (mimeType != null && mimeType.contains("mpeg")) {
            return "audio.mp3";
        }
        return "audio.wav";
    }

    @PostMapping(value = "/api/logs", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void ingestFrontendLog(@RequestBody FrontendLogRequest request) {
        String level = request.level() == null ? "INFO" : request.level().toUpperCase();
        String message = request.message() == null ? "" : request.message();
        String source = request.source() == null ? "browser" : request.source();
        String line = "[" + source + "] " + message;
        switch (level) {
            case "ERROR" -> FRONTEND_LOG.error(line);
            case "WARN" -> FRONTEND_LOG.warn(line);
            case "DEBUG" -> FRONTEND_LOG.debug(line);
            default -> FRONTEND_LOG.info(line);
        }
    }

    public record VoiceRequest(String audio, String mimeType) {
    }

    public record VoiceResponse(String text, String audio, String audioMimeType, String status) {
    }

    public record FrontendLogRequest(String level, String message, String source) {
    }
}
