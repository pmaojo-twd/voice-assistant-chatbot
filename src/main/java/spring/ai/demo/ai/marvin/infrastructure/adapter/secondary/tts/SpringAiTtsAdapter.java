package spring.ai.demo.ai.marvin.infrastructure.adapter.secondary.tts;

import org.springframework.ai.audio.tts.TextToSpeechModel;
import org.springframework.ai.audio.tts.TextToSpeechPrompt;
import org.springframework.stereotype.Component;
import spring.ai.demo.ai.marvin.domain.port.TtsPort;

@Component
public class SpringAiTtsAdapter implements TtsPort {

    private final TextToSpeechModel speechModel;

    public SpringAiTtsAdapter(TextToSpeechModel speechModel) {
        this.speechModel = speechModel;
    }

    @Override
    public byte[] synthesize(String text) {
        return speechModel.call(new TextToSpeechPrompt(text)).getResult().getOutput();
    }
}
