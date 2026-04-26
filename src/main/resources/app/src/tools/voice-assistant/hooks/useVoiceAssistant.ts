import { useState, useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";

export const useVoiceAssistant = (wsUrl: string) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [status, setStatus] = useState("Desconectado");
  const [subStatus, setSubStatus] = useState("Pulsa el micro para empezar");
  const [history, setHistory] = useState<string[]>([]);
  const [isBusy, setIsBusy] = useState(false);

  const socketRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const scriptProcessorRef = useRef<ScriptProcessorNode | null>(null);
  const analyzerRef = useRef<AnalyserNode | null>(null);

  const isStreamingRef = useRef(false);
  const isBusyRef = useRef(false);

  useEffect(() => {
    isStreamingRef.current = isStreaming;
  }, [isStreaming]);

  useEffect(() => {
    isBusyRef.current = isBusy;
  }, [isBusy]);

  const logToBackend = (level: string, message: string) => {
    fetch("https://marvin.pelayomaojo.es/api/logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ level, message, source: "mcp-app-vite" })
    }).catch(console.error);
  };

  const connect = useCallback(() => {
    setStatus("Conectando...");
    logToBackend("INFO", "Connecting to WebSocket...");
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;

    socket.onopen = () => {
      setStatus("Conectado");
      setSubStatus("Pulsa el micro para hablar");
      logToBackend("INFO", "WebSocket connected");
    };

    socket.onmessage = async (event) => {
      const response = JSON.parse(event.data);
      if (response.status === "speech_detected") {
        setSubStatus("Hablando... (Voz detectada)");
        return;
      }
      
      if (response.status === "success") {
        setHistory((prev) => [response.text, ...prev]);
        setIsBusy(true);
        setStatus("Respondiendo…");
        setSubStatus(response.text);
        
        // Play response
        const audioData = Uint8Array.from(atob(response.audio), (c) => c.charCodeAt(0));
        const blob = new Blob([audioData], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        const audio = new Audio(url);
        audio.onended = () => {
          setIsBusy(false);
          setStatus("Escuchando…");
          setSubStatus("Listo");
        };
        audio.play();
      } else {
        toast.error("Error del servidor: " + response.message);
      }
    };

    socket.onclose = () => {
      setStatus("Desconectado");
      setIsStreaming(false);
      setTimeout(connect, 3000);
    };
  }, [wsUrl]);

  useEffect(() => {
    connect();
    return () => {
      if (socketRef.current) socketRef.current.close();
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [connect]);

  const initAudio = async () => {
    try {
      logToBackend("INFO", "Checking microphone permission state...");
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const status = await navigator.permissions.query({ name: "microphone" as any });
          logToBackend("INFO", `Permission state: ${status.state}`);
        } catch (e) {
          logToBackend("WARN", "Permissions API not supported for microphone");
        }
      }

      logToBackend("INFO", "Requesting microphone access...");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      logToBackend("INFO", "Microphone access granted");
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      audioContextRef.current = audioContext;

      const source = audioContext.createMediaStreamSource(stream);
      const analyzer = audioContext.createAnalyser();
      analyzer.fftSize = 64;
      analyzerRef.current = analyzer;
      source.connect(analyzer);

      const scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
      scriptProcessorRef.current = scriptProcessor;
      source.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);

      scriptProcessor.onaudioprocess = (e) => {
        if (!isStreamingRef.current || isBusyRef.current) return;

        const inputData = e.inputBuffer.getChannelData(0);
        const pcmData = new Int16Array(inputData.length);
        for (let i = 0; i < inputData.length; i++) {
          pcmData[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7fff;
        }

        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(pcmData.buffer);
        }
      };

      return true;
    } catch (err: any) {
      toast.error("No se pudo acceder al micrófono: " + err.message);
      return false;
    }
  };

  const toggleStreaming = async () => {
    if (isStreaming) {
      setIsStreaming(false);
      setStatus("Conectado");
      setSubStatus("Pausado");
      if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
        socketRef.current.send("CLEAR");
      }
    } else {
      if (!audioContextRef.current) {
        const success = await initAudio();
        if (!success) return;
      }
      if (audioContextRef.current && audioContextRef.current.state === "suspended") {
        await audioContextRef.current.resume();
      }
      setIsStreaming(true);
      setStatus("Escuchando…");
      setSubStatus("VAD activo");
    }
  };

  return {
    isStreaming,
    status,
    subStatus,
    history,
    isBusy,
    toggleStreaming,
    analyzer: analyzerRef.current
  };
};
