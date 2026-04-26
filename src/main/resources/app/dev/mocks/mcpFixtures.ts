import type { McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const baseHostContext: McpUiHostContext = {
  locale: "en-US",
  timeZone: "UTC",
  theme: "light",
  displayMode: "inline",
  platform: "web",
} as McpUiHostContext;

export const helloWorldHostContext: McpUiHostContext = {
  ...baseHostContext,
  toolInfo: {
    tool: {
      name: "hello-world",
      inputSchema: { type: "object" },
    },
  },
} as McpUiHostContext;

export const helloWorldToolResult: CallToolResult = {
  content: [
    {
      type: "text",
      text: JSON.stringify({
        requestedName: "Pelayo",
        generatedAt: "2026-04-24T10:00:00.000Z",
        serverTimeZone: "Europe/Madrid",
      }),
    },
  ],
};
