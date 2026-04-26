package spring.ai.demo.ai.marvin.infrastructure.adapter.secondary.ai;

import org.springframework.ai.audio.transcription.TranscriptionModel;
import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.document.Document;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import spring.ai.demo.ai.marvin.domain.port.ChatbotPort;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class SpringAiChatbotAdapter implements ChatbotPort {

    private final ChatClient chatClient;
    private final TranscriptionModel transcriptionModel;

    public SpringAiChatbotAdapter(ChatClient chatClient, TranscriptionModel transcriptionModel) {
        this.chatClient = chatClient;
        this.transcriptionModel = transcriptionModel;
    }

    @Override
    public String transcribe(byte[] userAudioInput) {
        Resource audioResource = new ByteArrayResource(userAudioInput) {
            @Override
            public String getFilename() {
                return "audio.wav";
            }
        };
        
        AudioTranscriptionPrompt prompt = new AudioTranscriptionPrompt(audioResource);
        return transcriptionModel.call(prompt).getResult().getOutput();
    }

    @Override
    public AssistantMessage exchange(String textQuery, List<Document> context) {
        String contextText = context.stream()
                .map(Document::getText)
                .collect(Collectors.joining("\n\n"));

        String systemInstructions = "Utiliza el siguiente contexto interno de la empresa para responder a la pregunta del usuario. " +
                                     "Si la respuesta no está en el contexto, indícalo de forma cortés.\n\n" +
                                     "Contexto:\n" + contextText;

        return chatClient.prompt()
                .system(systemInstructions)
                .user(textQuery)
                .call()
                .chatResponse()
                .getResult()
                .getOutput();
    }
}