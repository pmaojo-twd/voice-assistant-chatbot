/**
 * @file Root entry point for the MCP App starter UI.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useTranslation } from "react-i18next";
import { Toaster } from "./shared/components/ui/sonner";
import { McpProvider, useMcp } from "./core/mcp/McpProvider";
import { TOOL_COMPONENTS } from "./tools/registry";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./i18n";
import "./index.css";

const queryClient = new QueryClient();

/**
 * Main Content Component.
 *
 * @description
 * This component acts as the router for the MCP application.
 * It reads the `toolName` provided by the host context and renders
 * the corresponding tool component from the registry.
 */
export const AppContent = () => {
  const { t } = useTranslation();
  const { app, error, hostContext, toolResult } = useMcp();

  if (error) {
    return (
      <div className="p-4 text-destructive flex flex-col items-center justify-center h-screen">
        <strong>{t("app.error")}</strong> {error.message}
      </div>
    );
  }

  if (!app) {
    return (
      <div className="p-4 flex items-center justify-center h-screen text-muted-foreground">
        {t("app.connecting")}
      </div>
    );
  }

  // Read the tool slug injected by the host environment.
  const toolName = hostContext?.toolInfo?.tool?.name;

  if (!toolName) {
    return <div>{t("app.noToolContext")}</div>;
  }

  // Resolve the React view registered for that slug.
  const ToolComponent = TOOL_COMPONENTS[toolName];

  if (!ToolComponent) {
    return <div>{t("app.toolNotFound", { toolName })}</div>;
  }

  return (
    <ToolComponent
      app={app}
      toolResult={toolResult}
      hostContext={hostContext}
    />
  );
};

// Guard the bootstrap so tests and server-side environments do not try to mount.
if (typeof document !== "undefined" && document.getElementById("root")) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <McpProvider>
          <AppContent />
          <Toaster />
        </McpProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
