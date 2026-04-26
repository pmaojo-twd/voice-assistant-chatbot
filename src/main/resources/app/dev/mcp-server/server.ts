import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type {
  CallToolResult,
  ReadResourceResult,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import { z } from "zod";

// Works both from source and compiled output.
const DIST_DIR = import.meta.filename.endsWith(".ts")
  ? path.join(import.meta.dirname, "..", "..", "dist")
  : import.meta.dirname;

const RESOURCE_URI = "ui://main/mcp-app.html";

function configureServer(server: McpServer) {
  registerAppResource(
    server,
    "mcp-app.html",
    RESOURCE_URI,
    {
      title: "MCP App UI",
      description: "Single-file React UI served to the MCP host.",
      mimeType: RESOURCE_MIME_TYPE,
    },
    async (): Promise<ReadResourceResult> => {
      const html = await fs.readFile(
        path.join(DIST_DIR, "mcp-app.html"),
        "utf-8"
      );
      return {
        contents: [
          {
            uri: RESOURCE_URI,
            mimeType: RESOURCE_MIME_TYPE,
            text: html,
          },
        ],
      };
    }
  );

  registerAppTool(
    server,
    "hello-world",
    {
      title: "Hello World",
      description:
        "Returns a greeting payload. Demonstrates one server roundtrip from the UI.",
      inputSchema: z.object({
        name: z.string().optional(),
      }),
      _meta: { ui: { resourceUri: RESOURCE_URI } },
    },
    async ({ name }): Promise<CallToolResult> => {
      const payload = {
        requestedName: name ?? "World",
        generatedAt: new Date().toISOString(),
        serverTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      return {
        content: [{ type: "text", text: JSON.stringify(payload) }],
      };
    }
  );
}

export function createServer(): McpServer {
  const server = new McpServer({
    name: "mcp-app-vite-starter",
    version: "0.1.0",
  });
  configureServer(server);
  return server;
}
