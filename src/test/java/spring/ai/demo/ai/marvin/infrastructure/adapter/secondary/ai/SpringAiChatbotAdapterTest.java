package spring.ai.demo.ai.marvin.infrastructure.adapter.secondary.ai;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.audio.transcription.AudioTranscription;
import org.springframework.ai.audio.transcription.TranscriptionModel;
import org.springframework.ai.audio.transcription.AudioTranscriptionPrompt;
import org.springframework.ai.audio.transcription.AudioTranscriptionResponse;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.Generation;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.document.Document;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class SpringAiChatbotAdapterTest {

    @Mock
    private ChatClient chatClient;

    @Mock
    private TranscriptionModel transcriptionModel;

    @InjectMocks
    private SpringAiChatbotAdapter springAiChatbotAdapter;

    @Test
    void shouldTranscribeAudio() {
        byte[] userAudio = new byte[]{1, 2, 3};

        AudioTranscriptionResponse response = mock(AudioTranscriptionResponse.class);
        AudioTranscription transcription = mock(AudioTranscription.class);

        when(transcriptionModel.call(any(AudioTranscriptionPrompt.class))).thenReturn(response);
        when(response.getResult()).thenReturn(transcription);
        when(transcription.getOutput()).thenReturn("Transcribed Text");

        String result = springAiChatbotAdapter.transcribe(userAudio);
        assertEquals("Transcribed Text", result);
    }

    @Test
    void shouldExchangeTextForResponse() {
        String textQuery = "Help me";
        List<Document> context = List.of(Document.builder().text("Here is help").build());
        AssistantMessage expectedMessage = new AssistantMessage("I am Marvin.");

        ChatClient.ChatClientRequestSpec requestSpec = mock(ChatClient.ChatClientRequestSpec.class);
        ChatClient.CallResponseSpec callResponseSpec = mock(ChatClient.CallResponseSpec.class);
        ChatResponse chatResponse = mock(ChatResponse.class);
        Generation generation = mock(Generation.class);

        when(chatClient.prompt()).thenReturn(requestSpec);
        when(requestSpec.system(anyString())).thenReturn(requestSpec);
        when(requestSpec.user(anyString())).thenReturn(requestSpec);
        when(requestSpec.call()).thenReturn(callResponseSpec);
        when(callResponseSpec.chatResponse()).thenReturn(chatResponse);
        when(chatResponse.getResult()).thenReturn(generation);
        when(generation.getOutput()).thenReturn(expectedMessage);

        AssistantMessage result = springAiChatbotAdapter.exchange(textQuery, context);
        assertEquals(expectedMessage, result);
    }
}
