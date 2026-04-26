package spring.ai.demo.ai.marvin.domain.port;

public interface TtsPort {
    /**
     * Transforma un texto en bytes de audio listos para ser reproducidos.
     */
    byte[] synthesize(String text);
}