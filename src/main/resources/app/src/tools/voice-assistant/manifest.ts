import { VoiceAssistantContainer } from "./VoiceAssistantContainer";
import type { ToolManifest } from "@/core/framework/tool-contract";

export const voiceAssistantManifest: ToolManifest = {
  slug: "startVoiceAssistant",
  title: "Voice Assistant",
  description: "Interactive voice assistant UI",
  version: "1.0.0",
  component: VoiceAssistantContainer as any,
};
