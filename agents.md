# 🤖 AI Agent Development Guide: Marvin

Este documento detalla cómo interactuar con el cerebro de Marvin y cómo extender sus capacidades de agente.

## 🧠 Estructura Cognitiva

Marvin utiliza el `ChatClient` de **Spring AI** como motor central. Su comportamiento está definido por:

1.  **System Prompt**: Ubicado en `src/main/resources/marvin.paranoid.android.txt`. Define su personalidad.
2.  **Advisors**: Se utiliza `MessageChatMemoryAdvisor` para mantener el hilo de la conversación.
3.  **RAG (KnowledgePort)**: Antes de cada respuesta, se consulta al puerto de conocimiento para inyectar contexto en el prompt.

## 🛠️ Cómo extender las capacidades

### 1. Añadir nuevas herramientas (Tools/MCP)
Marvin es compatible con herramientas de Spring AI. Para añadir una nueva:
- Crea un método anotado con `@Bean` que devuelva una `Function` o usa la anotación `@Tool`.
- Regístralo en el `ChatClient` dentro de `AppConfig.java`.

### 2. Cambiar de Adaptador (Estrategia Hexagonal)
Si deseas usar **Pinecone** en lugar de búsqueda local:
- Implementa la interfaz `KnowledgePort`.
- Usa `@ConditionalOnProperty` para permitir el cambio vía `application.properties`.
- Registra el nuevo adaptador en el paquete `infrastructure`.

## 📡 Protocolo de Comunicación (WebSocket)

El flujo de mensajes sigue este esquema JSON:

**Entrada (Audio):**
Binary stream de audio (PCM 16bit, 16kHz).

**Salida (Respuesta):**
```json
{
  "type": "transcription",
  "text": "...",
  "aiText": "...",
  "audio": "base64_audio_data"
}
```

## ⚠️ Mejores Prácticas para Agentes

1.  **No romper el Dominio**: Cualquier lógica nueva de "pensamiento" debe ir en el `VoiceAssistantService`. Las integraciones externas SIEMPRE a través de un nuevo puerto en `domain.port`.
2.  **VAD del Lado del Cliente**: La detección de silencio se gestiona en `useVoiceAssistant.ts`. Si Marvin responde demasiado pronto, ajusta los umbrales de `analyserNode` y `onaudioprocess` en el frontend.
3.  **Seguridad de Credenciales**: Nunca guardes API Keys en `application.properties`. Usa siempre el sistema `.env` integrado con `spring-dotenv`.

---
*Este documento es auto-generado para facilitar la orquestación agentica.*
