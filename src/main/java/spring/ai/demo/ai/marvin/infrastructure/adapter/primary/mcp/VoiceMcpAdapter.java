package spring.ai.demo.ai.marvin.infrastructure.adapter.primary.mcp;

import io.modelcontextprotocol.spec.McpSchema;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger log = LoggerFactory.getLogger(VoiceMcpAdapter.class);

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

    @McpTool(description = "Ingests logs from the UI")
    public void ingestLogs(String level, String message, String source) {
        String lvl = level == null ? "INFO" : level.toUpperCase();
        String msg = message == null ? "" : message;
        String src = source == null ? "browser" : source;
        String line = "[" + src + "] " + msg;
        switch (lvl) {
            case "ERROR" -> log.error(line);
            case "WARN" -> log.warn(line);
            case "DEBUG" -> log.debug(line);
            default -> log.info(line);
        }
    }

    public static final class VoiceUiToolMetaProvider implements MetaProvider {
        @Override
        public Map<String, Object> getMeta() {
            return Map.of(
                    "ui/resourceUri", UI_URI,
                    "ui", Map.of(
                            "resourceUri", UI_URI,
                            "preferredFrameSize", List.of("420px", "640px"),
                            "permissions", Map.of("microphone", Map.of())
                    )
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
                        "permissions", Map.of(
                                "microphone", Map.of(),
                                "audio", Map.of()
                        ),
                        "required", List.of("microphone"),
                        "features", List.of("microphone", "audio"),
                        "csp", Map.of(
                                "connectDomains", List.of(
                                        "https://marvin.pelayomaojo.es",
                                        "wss://marvin.pelayomaojo.es",
                                        "https://app.mcpjam.com",
                                        "http://localhost:8081",
                                        "ws://localhost:8081",
                                        "https://cdn.jsdelivr.net",
                                        "https://unpkg.com"
                                ),
                                "media-src", List.of("'self'", "blob:", "https://marvin.pelayomaojo.es"),
                                "resourceDomains", List.of(
                                        "https://cdn.jsdelivr.net",
                                        "https://unpkg.com",
                                        "https://fonts.googleapis.com",
                                        "https://fonts.gstatic.com"
                                ),
                                "script-src", List.of("'self'", "'unsafe-eval'", "'wasm-unsafe-eval'", "https://cdn.jsdelivr.net", "https://unpkg.com"),
                                "worker-src", List.of("'self'", "blob:", "https://cdn.jsdelivr.net", "https://unpkg.com"),
                                "frameDomains", List.<String>of()
                        )
                )
        );
    }

    private String loadUiHtml() {
        try {
            // First try to load the built Vite app
            ClassPathResource builtResource = new ClassPathResource("app/dist/mcp-app.html");
            if (builtResource.exists()) {
                log.info("Serving built Vite UI from app/dist/mcp-app.html");
                return StreamUtils.copyToString(builtResource.getInputStream(), StandardCharsets.UTF_8);
            }
            // Fallback to legacy HTML if build hasn't run yet
            log.warn("Built UI not found. Falling back to legacy app/voice-app.html");
            ClassPathResource legacyResource = new ClassPathResource("app/voice-app.html");
            return StreamUtils.copyToString(legacyResource.getInputStream(), StandardCharsets.UTF_8);
        } catch (IOException e) {
            throw new UncheckedIOException(e);
        }
    }
}
