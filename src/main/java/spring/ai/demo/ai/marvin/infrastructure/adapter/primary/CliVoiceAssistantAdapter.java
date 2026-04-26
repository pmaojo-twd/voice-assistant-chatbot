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
package spring.ai.demo.ai.marvin.infrastructure.adapter.primary;

import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import spring.ai.demo.ai.marvin.application.VoiceAssistantService;

@Component
public class CliVoiceAssistantAdapter implements CommandLineRunner {

    private final VoiceAssistantService voiceAssistantService;

    public CliVoiceAssistantAdapter(VoiceAssistantService voiceAssistantService) {
        this.voiceAssistantService = voiceAssistantService;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("==================================================");
        System.out.println("🎤 Asistente Iniciado (Modo Detección de Voz Activo)");
        System.out.println("==================================================");
        
        while (true) {
            System.out.print("\nEsperando a que hables... (Silencio para enviar) ");
            
            voiceAssistantService.listenAndRecordUserAudio();
            
            System.out.print("PROCESANDO ...\n");
            AssistantMessage response = voiceAssistantService.processUserAudioAndGetResponse();
            System.out.println("\nASISTENTE: " + response.getText());
            voiceAssistantService.playAssistantResponse(response);
        }
    }
}