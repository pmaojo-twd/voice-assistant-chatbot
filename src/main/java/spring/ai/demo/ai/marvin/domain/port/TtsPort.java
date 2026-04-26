package spring.ai.demo.ai.marvin.domain.port;

public interface TtsPort {
    byte[] synthesize(String text);
}
