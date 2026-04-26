package spring.ai.demo.ai.marvin.application;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.document.Document;
import spring.ai.demo.ai.marvin.domain.port.AudioPort;
import spring.ai.demo.ai.marvin.domain.port.ChatbotPort;
import spring.ai.demo.ai.marvin.domain.port.KnowledgePort;
import spring.ai.demo.ai.marvin.domain.port.TtsPort;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class VoiceAssistantServiceTest {

    @Mock
    private AudioPort audioPort;

    @Mock
    private ChatbotPort chatbotPort;

    @Mock
    private KnowledgePort knowledgePort;

    @Mock
    private TtsPort ttsPort;

    @InjectMocks
    private VoiceAssistantService voiceAssistantService;

    @Test
    void shouldStartRecordingUserAudio() {
        voiceAssistantService.startRecordingUserAudio();
        verify(audioPort, times(1)).startRecording();
    }

    @Test
    void shouldStopRecordingUserAudio() {
        voiceAssistantService.stopRecordingUserAudio();
        verify(audioPort, times(1)).stopRecording();
    }

    @Test
    void shouldStopPlayingAssistantResponse() {
        voiceAssistantService.stopPlayingAssistantResponse();
        verify(audioPort, times(1)).stopPlaying();
    }

    @Test
    void shouldListenAndRecordUserAudio() {
        voiceAssistantService.listenAndRecordUserAudio();
        verify(audioPort, times(1)).recordActiveSpeech(any(Runnable.class));
    }

    @Test
    void shouldProcessUserAudioAndGetResponse() {
        byte[] mockAudio = new byte[]{1, 2, 3};
        String mockTranscription = "Consulta test";
        List<Document> mockDocs = List.of(Document.builder().text("Contexto importante").build());
        AssistantMessage mockResponse = new AssistantMessage("Hello!");

        when(audioPort.getLastRecording()).thenReturn(mockAudio);
        when(chatbotPort.transcribe(mockAudio, "audio.wav")).thenReturn(mockTranscription);
        when(knowledgePort.findSimilarDocuments(mockTranscription)).thenReturn(mockDocs);
        when(chatbotPort.exchange(mockTranscription, mockDocs)).thenReturn(mockResponse);

        AssistantMessage result = voiceAssistantService.processUserAudioAndGetResponse();

        assertEquals(mockResponse, result);
        verify(chatbotPort, times(1)).transcribe(mockAudio, "audio.wav");
        verify(knowledgePort, times(1)).findSimilarDocuments(mockTranscription);
        verify(chatbotPort, times(1)).exchange(mockTranscription, mockDocs);
    }

    @Test
    void shouldThrowExceptionWhenNoAudioRecorded() {
        when(audioPort.getLastRecording()).thenReturn(new byte[0]);

        IllegalStateException exception = assertThrows(IllegalStateException.class,
                () -> voiceAssistantService.processUserAudioAndGetResponse());

        assertEquals("No audio recorded to process.", exception.getMessage());
        verifyNoInteractions(chatbotPort);
    }

    @Test
    void shouldPlayAssistantResponse() {
        String responseText = "Response";
        byte[] audioData = new byte[]{4, 5, 6};
        AssistantMessage mockResponse = new AssistantMessage(responseText);
        when(ttsPort.synthesize(responseText)).thenReturn(audioData);
        voiceAssistantService.playAssistantResponse(mockResponse);
        verify(audioPort, times(1)).play(audioData);
    }

    @Test
    void shouldProcessBrowserAudioWithOriginalFilenameAndSynthesizeResponse() {
        byte[] browserAudio = new byte[]{8, 9, 10};
        List<Document> mockDocs = List.of(Document.builder().text("Contexto").build());
        AssistantMessage mockResponse = new AssistantMessage("Respuesta");
        byte[] assistantAudio = new byte[]{11, 12};

        when(chatbotPort.transcribe(browserAudio, "audio.webm")).thenReturn("Pregunta");
        when(knowledgePort.findSimilarDocuments("Pregunta")).thenReturn(mockDocs);
        when(chatbotPort.exchange("Pregunta", mockDocs)).thenReturn(mockResponse);
        when(ttsPort.synthesize("Respuesta")).thenReturn(assistantAudio);

        VoiceAssistantExchange result = voiceAssistantService.processAudioBytesAndSynthesize(browserAudio, "audio.webm");

        assertEquals("Respuesta", result.text());
        assertArrayEquals(assistantAudio, result.audio());
    }
}
