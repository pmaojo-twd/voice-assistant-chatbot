package spring.ai.demo.ai.marvin.infrastructure.adapter.primary.mcp;

import io.modelcontextprotocol.spec.McpSchema;
import org.springframework.ai.mcp.annotation.McpResource;
import org.springframework.ai.mcp.annotation.McpTool;
import org.springframework.ai.mcp.annotation.context.MetaProvider;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import spring.ai.demo.ai.marvin.application.VoiceAssistantExchange;
import spring.ai.demo.ai.marvin.application.VoiceAssistantService;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@Component
public class VoiceMcpAdapter {

    private static final String UI_URI = "ui://voice-app";
    private static final String UI_MIME = "text/html;profile=mcp-app";

    private final VoiceAssistantService voiceAssistantService;

    public VoiceMcpAdapter(VoiceAssistantService voiceAssistantService) {
        this.voiceAssistantService = voiceAssistantService;
    }

    @McpResource(uri = UI_URI, name = "Voice Assistant UI",
            description = "Interactive UI for voice interaction", mimeType = UI_MIME,
            metaProvider = VoiceUiResourceMetaProvider.class)
    public String getVoiceAppUi() {
        return loadUiHtml();
    }

    @McpTool(description = "Starts a voice-enabled conversation in a rich UI",
            metaProvider = VoiceUiToolMetaProvider.class)
    public McpSchema.CallToolResult startVoiceAssistant(String initialQuery) {
        String html = loadUiHtml();
        McpSchema.TextResourceContents contents = new McpSchema.TextResourceContents(
                UI_URI, UI_MIME, html, resourceMeta());
        McpSchema.EmbeddedResource embedded = new McpSchema.EmbeddedResource(null, contents, resourceMeta());
        Map<String, Object> resultMeta = Map.of(
                "ui/resourceUri", UI_URI,
                "ui", Map.of("resourceUri", UI_URI),
                "initialQuery", initialQuery == null ? "" : initialQuery
        );
        return new McpSchema.CallToolResult(List.<McpSchema.Content>of(embedded), false, null, resultMeta);
    }

    @McpTool(description = "Processes a base64 encoded audio clip and returns text plus synthesized audio")
    public Map<String, Object> processVoice(String audio) {
        byte[] audioBytes = Base64.getDecoder().decode(audio);
        VoiceAssistantExchange response = voiceAssistantService.processAudioBytesAndSynthesize(audioBytes);
        return Map.of(
                "text", response.text(),
                "audio", Base64.getEncoder().encodeToString(response.audio()),
                "audioMimeType", "audio/wav",
                "status", "success"
        );
    }

    public static final class VoiceUiToolMetaProvider implements MetaProvider {
        @Override
        public Map<String, Object> getMeta() {
            return Map.of(
                    "ui/resourceUri", UI_URI,
                    "ui", Map.of(
                            "resourceUri", UI_URI,
                            "preferredFrameSize", List.of("420px", "640px")
                    ),
                    "openai/outputTemplate", UI_URI,
                    "securitySchemes", List.of(Map.of("type", "noauth"))
            );
        }
    }

    public static final class VoiceUiResourceMetaProvider implements MetaProvider {
        @Override
        public Map<String, Object> getMeta() {
            return resourceMeta();
        }
    }

    private static Map<String, Object> resourceMeta() {
        return Map.of(
                "ui", Map.of(
                        "prefersBorder", true,
                        "csp", Map.of(
                                "connectDomains", List.of("https://marvin.pelayomaojo.es"),
                                "resourceDomains", List.of(
                                        "https://cdn.jsdelivr.net",
                                        "https://unpkg.com",
                                        "https://fonts.googleapis.com",
                                        "https://fonts.gstatic.com"
                                ),
                                "frameDomains", List.<String>of()
                        )
                )
        );
    }

    private String loadUiHtml() {
        try {
            ClassPathResource resource = new ClassPathResource("app/voice-app.html");
            return StreamUtils.copyToString(resource.getInputStream(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
