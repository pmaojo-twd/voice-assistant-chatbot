package spring.ai.demo.ai.marvin.infrastructure.adapter.primary.mcp;

import org.springframework.ai.mcp.annotation.McpTool;
import org.springframework.ai.mcp.annotation.McpResource;
import org.springframework.ai.chat.messages.AssistantMessage;
import org.springframework.stereotype.Component;
import spring.ai.demo.ai.marvin.application.VoiceAssistantService;
import org.springframework.core.io.ClassPathResource;
import org.springframework.util.StreamUtils;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Map;

@Component
public class VoiceMcpAdapter {

    private final VoiceAssistantService voiceAssistantService;

    public VoiceMcpAdapter(VoiceAssistantService voiceAssistantService) {
        this.voiceAssistantService = voiceAssistantService;
    }

    @McpResource(uri = "ui://voice-app", name = "Voice Assistant UI", description = "Interactive UI for voice interaction")
    public String getVoiceAppUi() throws IOException {
        ClassPathResource resource = new ClassPathResource("app/voice-app.html");
        return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
    }

    @McpTool(description = "Starts a voice-enabled conversation in a rich UI")
    public Map<String, Object> startVoiceAssistant(String initialQuery) {
        return Map.of(
            "type", "resource",
            "resource", Map.of(
                "uri", "ui://voice-app",
                "name", "Voice Assistant UI",
                "content", Map.of(
                    "type", "raw_html",
                    "htmlString", ""
                )
            ),
            "query", initialQuery
        );
    }

    @McpTool(description = "Processes a base64 encoded audio chunk and returns text and audio response")
    public Map<String, Object> processVoice(String audio) {
        byte[] audioBytes = Base64.getDecoder().decode(audio);
        AssistantMessage response = voiceAssistantService.processAudioBytes(audioBytes);
        
        return Map.of(
            "text", response.getText() != null ? response.getText() : "",
            "status", "success"
        );
    }
}
