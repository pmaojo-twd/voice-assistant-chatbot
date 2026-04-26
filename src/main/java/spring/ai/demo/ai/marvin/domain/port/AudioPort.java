package spring.ai.demo.ai.marvin.domain.port;

import java.io.InputStream;

public interface AudioPort {
    void startRecording();
    void stopRecording();
    byte[] getLastRecording();
    void play(byte[] waveData);
    void stopPlaying();

    /**
     * Escucha pasivamente el micrófono hasta detectar voz.
     * Una vez detectada, graba hasta que haya silencio continuo.
     * @param onSpeechStart Acción a ejecutar en el instante que se detecta la voz.
     */
    void recordActiveSpeech(Runnable onSpeechStart);
}