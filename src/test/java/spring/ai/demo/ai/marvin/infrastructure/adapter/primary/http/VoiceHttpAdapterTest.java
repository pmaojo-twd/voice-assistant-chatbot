package spring.ai.demo.ai.marvin.infrastructure.adapter.primary.http;

import org.junit.jupiter.api.Test;
import spring.ai.demo.ai.marvin.application.VoiceAssistantExchange;
import spring.ai.demo.ai.marvin.application.VoiceAssistantService;

import java.util.Base64;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.ArgumentCaptor.forClass;
import org.mockito.ArgumentCaptor;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class VoiceHttpAdapterTest {

    private final VoiceAssistantService voiceAssistantService = mock(VoiceAssistantService.class);

    private final VoiceHttpAdapter voiceHttpAdapter = new VoiceHttpAdapter(voiceAssistantService);

    @Test
    void shouldProcessBrowserWebmAudioAndReturnTextAndAudio() {
        byte[] userAudio = new byte[]{1, 2, 3};
        byte[] assistantAudio = new byte[]{4, 5, 6};
        when(voiceAssistantService.processAudioBytesAndSynthesize(any(byte[].class), eq("audio.webm")))
                .thenReturn(new VoiceAssistantExchange("Hola", assistantAudio));

        VoiceHttpAdapter.VoiceResponse response = voiceHttpAdapter.processVoice(
                new VoiceHttpAdapter.VoiceRequest(Base64.getEncoder().encodeToString(userAudio), "audio/webm"));

        assertEquals("Hola", response.text());
        assertEquals(Base64.getEncoder().encodeToString(assistantAudio), response.audio());
        assertEquals("audio/wav", response.audioMimeType());
        assertEquals("success", response.status());
        ArgumentCaptor<byte[]> audioCaptor = forClass(byte[].class);
        verify(voiceAssistantService).processAudioBytesAndSynthesize(audioCaptor.capture(), eq("audio.webm"));
        assertArrayEquals(userAudio, audioCaptor.getValue());
    }
}
