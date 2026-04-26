# 🎙️ Marvin: Voice Assistant Chatbot

Marvin es un asistente de voz de vanguardia diseñado bajo una **Arquitectura Hexagonal (Puertos y Adaptadores)**, lo que permite una flexibilidad total en el intercambio de modelos y tecnologías. Está optimizado para funcionar de forma **100% local**, garantizando privacidad y baja latencia.

## 🌟 Características Principales

- **Arquitectura Hexagonal**: Separación clara entre la lógica de dominio y las implementaciones tecnológicas.
- **Procesamiento de Voz en Tiempo Real**: Comunicación bidireccional mediante WebSockets.
- **Stack de IA Local**:
  - **LLM**: Llama 3.2 vía Ollama.
  - **STT (Speech-to-Text)**: Whisper local.
  - **TTS (Text-to-Speech)**: Kokoro local (Voz clonada de alta fidelidad).
- **RAG Flexible**: Soporte para búsqueda vectorial (SimpleVectorStore/Pinecone) y modos de estrategia comercial (Sales Mode).
- **Frontend Moderno**: Interfaz SPA construida con Vite, React y TypeScript, integrada en el ciclo de vida de Maven.

## 🏗️ Arquitectura del Sistema

El proyecto sigue los principios de diseño DDD y Hexagonal:

- **Domain**: Contiene la lógica de negocio (`VoiceAssistantService`) y los **Puertos** (interfaces) que definen las capacidades del sistema.
- **Infrastructure**: Contiene los **Adaptadores** (implementaciones concretas):
  - **Primary**: WebSockets para la entrada del usuario.
  - **Secondary**: Integraciones con Ollama, Whisper, Kokoro y Vector Stores.
- **Application**: Configuración de Spring Boot y beans.

## 🚀 Flujo de Datos

1. **Captura**: El frontend captura audio, detecta actividad de voz (VAD) y envía el stream por WebSocket.
2. **Transcripción**: El `AudioPort` procesa el audio usando Whisper.
3. **Conocimiento (RAG)**: El `KnowledgePort` inyecta contexto relevante (o estrategias comerciales fijas).
4. **Razonamiento**: `ChatClient` de Spring AI genera una respuesta inteligente.
5. **Síntesis**: El `TtsPort` convierte el texto a audio usando Kokoro.
6. **Respuesta**: Se envía el audio y el texto de vuelta al cliente para su reproducción inmediata.

## 🛠️ Configuración y Ejecución

### Requisitos Previos
- Java 21+
- Maven 3.9+
- Ollama corriendo localmente (`llama3.2` y `nomic-embed-text`)
- Servidor de Kokoro/Whisper accesible (según configuración)

### Instalación
1. Clona el repositorio.
2. Configura tu archivo `.env` basado en el `.env.example`.
3. Ejecuta el proyecto:
   ```bash
   ./mvnw spring-boot:run
   ```

### Modos de Funcionamiento (RAG)
Configurable en `application.properties`:
- `rag.mode=vector`: Usa búsqueda semántica local.
- `rag.mode=sales`: Activa el "Modo Comercial Orion" para venta de productos.

---
*Hecho con ❤️ por el equipo de Advanced Agentic Coding.*
