import type { Decorator } from "@storybook/react";
import type { App, McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { McpContext, type McpContextValue } from "@/core/mcp/McpProvider";
import { baseHostContext } from "./mcpFixtures";

// Fake App: resolves bridge calls so host actions don't crash in stories.
export const createMockApp = (overrides: Partial<App> = {}): App =>
  ({
    sendMessage: async () => undefined,
    sendLog: async () => undefined,
    openLink: async () => undefined,
    getHostContext: () => baseHostContext,
    callTool: async () => ({ content: [] }) as CallToolResult,
    ...overrides,
  }) as unknown as App;

export interface MockMcpOverrides {
  app?: App | null;
  error?: Error | null;
  hostContext?: McpUiHostContext;
  toolResult?: CallToolResult | null;
}

export const withMockMcp =
  (overrides: MockMcpOverrides = {}): Decorator =>
  (Story) => {
    const value: McpContextValue = {
      app: overrides.app === undefined ? createMockApp() : overrides.app,
      error: overrides.error ?? null,
      hostContext: overrides.hostContext ?? baseHostContext,
      toolResult: overrides.toolResult ?? null,
    };
    return (
      <McpContext.Provider value={value}>
        <Story />
      </McpContext.Provider>
    );
  };
