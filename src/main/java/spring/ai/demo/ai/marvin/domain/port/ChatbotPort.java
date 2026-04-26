package spring.ai.demo.ai.marvin.domain.port;

import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.document.Document;
import java.util.List;

public interface ChatbotPort {
    /**
     * Transcribes raw audio bytes from the user into text.
     */
    String transcribe(byte[] userAudioInput);

    /**
     * Transcribe audio bytes preserving the original browser/container filename.
     */
    default String transcribe(byte[] userAudioInput, String audioFilename) {
        return transcribe(userAudioInput);
    }

    /**
     * Sends a text query to the chatbot along with relevant context from the knowledge base.
     * @return An AssistantMessage containing the response.
     */
    AssistantMessage exchange(String textQuery, List<Document> context);
}
