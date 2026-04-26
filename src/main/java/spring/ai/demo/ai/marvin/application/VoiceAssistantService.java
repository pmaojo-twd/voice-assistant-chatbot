/*
 * Copyright 2024 - 2024 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package spring.ai.demo.ai.marvin.application;

import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;
import spring.ai.demo.ai.marvin.domain.port.AudioPort;
import spring.ai.demo.ai.marvin.domain.port.ChatbotPort;
import spring.ai.demo.ai.marvin.domain.port.KnowledgePort;
import spring.ai.demo.ai.marvin.domain.port.TtsPort;

import java.util.List;

@Service
public class VoiceAssistantService {

    private final AudioPort audioPort;
    private final ChatbotPort chatbotPort;
    private final KnowledgePort knowledgePort;
    private final TtsPort ttsPort;

    public VoiceAssistantService(AudioPort audioPort, ChatbotPort chatbotPort, KnowledgePort knowledgePort, TtsPort ttsPort) {
        this.audioPort = audioPort;
        this.chatbotPort = chatbotPort;
        this.knowledgePort = knowledgePort;
        this.ttsPort = ttsPort;
    }

    public void startRecordingUserAudio() {
        audioPort.startRecording();
    }

    public void stopRecordingUserAudio() {
        audioPort.stopRecording();
    }

    public void stopPlayingAssistantResponse() {
        audioPort.stopPlaying();
    }

    public void listenAndRecordUserAudio() {
        audioPort.recordActiveSpeech(() -> {
            this.stopPlayingAssistantResponse();
        });
    }

    public AssistantMessage processUserAudioAndGetResponse() {
        return processAudioBytes(audioPort.getLastRecording());
    }

    public AssistantMessage processAudioBytes(byte[] userAudio) {
        if (userAudio == null || userAudio.length == 0) {
            throw new IllegalStateException("No audio recorded to process.");
        }
        
        // 1. Transcribir Voz a Texto
        String transcription = chatbotPort.transcribe(userAudio);
        System.out.println("\n[TRANSCRIPCIÓN]: " + transcription);
        
        // 2. Buscar Contexto
        List<Document> relevantDocs = knowledgePort.findSimilarDocuments(transcription);
        System.out.println("[KNOWLEDGE BASE]: Encontramos " + relevantDocs.size() + " fragmentos.");
        
        // 3. Consultar al LLM con el Contexto
        return chatbotPort.exchange(transcription, relevantDocs);
    }

    public void playAssistantResponse(AssistantMessage assistantMessage) {
        if (assistantMessage != null && assistantMessage.getText() != null && !assistantMessage.getText().isEmpty()) {
            byte[] audioData = ttsPort.synthesize(assistantMessage.getText());
            if (audioData != null && audioData.length > 0) {
                audioPort.play(audioData);
            }
        }
    }
}