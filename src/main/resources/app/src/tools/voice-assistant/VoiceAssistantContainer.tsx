import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useVoiceAssistant } from "./hooks/useVoiceAssistant";
import { VoiceAssistantView } from "./components/VoiceAssistantView";
import type { ToolComponentProps } from "@/core/framework/tool-contract";

export const VoiceAssistantContainer: React.FC<ToolComponentProps> = () => {
  const backendUrl = "https://marvin.pelayomaojo.es"; // Default
  const wsUrl = backendUrl.replace("http", "ws") + "/ws/voice";

  // Example of TanStack Query usage to fetch backend status
  const { data: serverStatus } = useQuery({
    queryKey: ["serverStatus"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/api/status`);
      if (!res.ok) throw new Error("Server unreachable");
      return res.json();
    },
    refetchInterval: 30000 // Every 30 seconds
  });

  const {
    isStreaming,
    status,
    subStatus,
    history,
    isBusy,
    toggleStreaming,
    analyzer
  } = useVoiceAssistant(wsUrl);

  // We can enhance the status with server information if available
  const enrichedStatus = serverStatus?.status === "online" 
    ? status 
    : (status === "Desconectado" ? "Servidor Offline" : status);

  return (
    <VoiceAssistantView
      isStreaming={isStreaming}
      status={enrichedStatus}
      subStatus={subStatus}
      history={history}
      isBusy={isBusy}
      onToggleStreaming={toggleStreaming}
      analyzer={analyzer}
    />
  );
};
