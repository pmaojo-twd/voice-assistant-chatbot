# Skill Creator Specifications - Voice Assistant MCP

This document provides the specifications and examples for creating new "Skills" (MCP Tools and Resources) for the Voice Assistant Chatbot.

## Architecture Overview

A "Skill" in this project consists of:
1.  **Backend Logic**: A Java service or component that implements the functionality.
2.  **MCP Adapter**: Methods annotated with `@McpTool` or `@McpResource` in `VoiceMcpAdapter.java` (or a similar adapter class).
3.  **Frontend Integration (Optional)**: Rich UI components in `voice-app.html` if the skill requires interactive visuals.

## Creating a New Skill (Step-by-Step)

### 1. Define the Backend Service
Create a Spring service that handles the core logic.

```java
@Service
public class WeatherService {
    public String getWeather(String city) {
        // Integration with Weather API
        return "The weather in " + city + " is sunny, 25°C.";
    }
}
```

### 2. Register the MCP Tool
Add a method to your MCP Adapter class.

```java
@Component
public class WeatherMcpAdapter {
    private final WeatherService weatherService;

    public WeatherMcpAdapter(WeatherService weatherService) {
        this.weatherService = weatherService;
    }

    @McpTool(description = "Get current weather for a city")
    public String getWeather(String city) {
        return weatherService.getWeather(city);
    }
}
```

### 3. Adding UI Metadata (Advanced)
If your tool should trigger a specific UI or requires permissions, use a `MetaProvider`.

```java
@McpTool(description = "Capture a photo", metaProvider = CameraMetaProvider.class)
public String capturePhoto() {
    return "Photo captured";
}

public static final class CameraMetaProvider implements MetaProvider {
    @Override
    public Map<String, Object> getMeta() {
        return Map.of(
            "ui", Map.of(
                "permissions", Map.of("camera", Map.of())
            )
        );
    }
}
```

## Advanced: MCP Server vs MCP Host

In this project, the **Voice Assistant** can play two roles:
1.  **MCP Server**: It exposes the Voice UI and audio processing tools (like `processVoice`) to other applications.
2.  **MCP Host (AI Agent)**: It uses other MCP servers (like a "Weather" server or "Company CRM") to fulfill user requests.

### Adding a Skill for the AI Agent (Host Mode)
To allow the Marvin assistant to use a new tool, register it in `AppConfig.java`:

```java
@Bean
public ChatClient chatClient(ChatClient.Builder chatClientBuilder,
                             ChatMemory chatMemory,
                             MyWeatherTool weatherTool) {
    return chatClientBuilder
            .defaultFunctions("getWeather") // Matches the @Bean name or @Description
            .defaultAdvisors(new MessageChatMemoryAdvisor(chatMemory))
            .build();
}
```

### Creating a Custom Interactive Skill
If you want a skill that opens a specific UI component:

1.  **Define the Tool in Java**:
    ```java
    @McpTool(description = "Show flight status", metaProvider = FlightMetaProvider.class)
    public McpSchema.CallToolResult showFlights(String flightNumber) {
        // ... return embedded HTML or resource URI ...
    }
    ```

2.  **Define Metadata**:
    ```java
    public static final class FlightMetaProvider implements MetaProvider {
        @Override
        public Map<String, Object> getMeta() {
            return Map.of(
                "ui", Map.of(
                    "resourceUri", "ui://flights",
                    "preferredFrameSize", List.of("500px", "400px")
                )
            );
        }
    }
    ```

## Troubleshooting VAD & Permissions

If you encounter "Microphone or VAD failed":
- **Permissions**: Ensure the parent application (the MCP Host) has granted microphone access to the iframe.
- **CSP**: Check `VoiceMcpAdapter.java` to ensure the `connectDomains` and `script-src` allow the CDNs used (jsdelivr, unpkg).
- **WASM**: VAD requires ONNX Runtime WASM. If it fails to load, check the browser console for "Cross-Origin-Embedder-Policy" (COEP) errors. In the current version of `voice-app.html`, we force `numThreads = 1` to maximize compatibility in non-isolated environments.

## Relevant Examples for this Project

- **`VIAJES` Skill**: Integrate flight search for a travel assistant.
- **`CRM` Skill**: Look up user preferences before starting the conversation.
- **`HomeAutomation` Skill**: Control lights or temperature via voice commands.
