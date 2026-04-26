import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { useApp, useHostStyles } from "@modelcontextprotocol/ext-apps/react";
import type { App, McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { logger } from "./logger";

// toolResult is dispatched once by the host; cache it across HMR and history nav.
const STORAGE_KEY = "__mcp_tool_result";

const readCache = (): CallToolResult | null => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CallToolResult) : null;
  } catch {
    return null;
  }
};

let memToolResult = readCache();
const listeners = new Set<() => void>();
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

export interface McpContextValue {
  app: App | null;
  error: Error | null;
  hostContext: McpUiHostContext | undefined;
  toolResult: CallToolResult | null;
}

export const McpContext = createContext<McpContextValue | undefined>(undefined);

export const McpProvider = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();
  const [hostContext, setHostContext] = useState<McpUiHostContext>();

  const toolResult = useSyncExternalStore(
    subscribe,
    () => memToolResult,
    () => null
  );

  const onAppCreated = useCallback((newApp: App) => {
    newApp.onteardown = async () => ({});
    newApp.ontoolinput = async (input) => logger.info("tool input", input);
    newApp.ontoolresult = async (result) => {
      memToolResult = result;
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
      } catch {
        /* sessionStorage may be unavailable */
      }
      listeners.forEach((l) => l());
    };
    newApp.ontoolcancelled = (p) =>
      logger.warn("tool cancelled", { reason: p.reason });
    newApp.onerror = (e) => logger.error("mcp error", e);
    newApp.onhostcontextchanged = () => setHostContext(newApp.getHostContext());
  }, []);

  const { app, error } = useApp({
    appInfo: { name: "Dynamic MCP App", version: "1.0.0" },
    capabilities: {
      permissions: {
        microphone: {}
      }
    } as any,
    onAppCreated,
  });

  const resolvedHostContext = hostContext ?? app?.getHostContext();
  useHostStyles(app, resolvedHostContext);

  useEffect(() => {
    logger.setApp(app);
    return () => logger.setApp(null);
  }, [app]);

  useEffect(() => {
    if (error) logger.error(t("app.logs.error", "App Error"), error.message);
  }, [error, t]);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "dark",
      resolvedHostContext?.theme === "dark"
    );
  }, [resolvedHostContext?.theme]);

  return (
    <McpContext.Provider
      value={{ app, error, hostContext: resolvedHostContext, toolResult }}
    >
      {children}
    </McpContext.Provider>
  );
};

export const useMcp = () => {
  const ctx = useContext(McpContext);
  if (!ctx) throw new Error("useMcp must be used within an McpProvider");
  return ctx;
};
