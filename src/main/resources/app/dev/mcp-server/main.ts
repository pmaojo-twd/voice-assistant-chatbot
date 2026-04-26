/**
 * Reference MCP server entry point.
 *
 * Run from source:
 *   bun run serve          # HTTP Streamable (http://localhost:3001/mcp)
 *   bun run serve:stdio    # stdio transport (Claude Desktop, VS Code)
 *
 * Run compiled (after `bun run build:full`):
 *   node dist/index.js [--stdio]
 */

import { createMcpExpressApp } from "@modelcontextprotocol/sdk/server/express.js";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import cors from "cors";
import type { NextFunction, Request, Response } from "express";
import express from "express";
import fs from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";
import { createServer } from "./server.js";

export function buildApp(createServerFn: () => McpServer) {
  const isUiOnly = process.env.BUILD_FLAVOR === "ui-only";

  const app = createMcpExpressApp({ host: "0.0.0.0" });
  app.use(cors());
  app.use(express.static(path.join(process.cwd(), "public")));

  app.get("/", (_req, res) => {
    const htmlPath = import.meta.filename.endsWith(".ts")
      ? path.join(import.meta.dirname, "..", "..", "dist", "mcp-app.html")
      : path.join(import.meta.dirname, "mcp-app.html");

    if (fs.existsSync(htmlPath)) {
      res.sendFile(htmlPath);
    } else {
      res
        .status(404)
        .send(`UI not found at ${htmlPath}. Run \`bun run build:ui\` first.`);
    }
  });

  const keepStreamAlive = (
    _req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    next();
  };

  const handleMcp = async (req: Request, res: Response) => {
    if (isUiOnly) {
      res.status(404).send("MCP Server disabled in ui-only mode.");
      return;
    }

    const sessionId = getSessionIdHeader(req);
    if (
      req.method === "GET" &&
      !sessionId &&
      req.headers.accept?.includes("text/html")
    ) {
      res
        .status(400)
        .send(
          "This endpoint is for MCP clients. Use Streamable HTTP on /mcp, do not open it in a browser."
        );
      return;
    }

    await handleMcpRequest(req, res, createServerFn);
  };

  app.get("/mcp", keepStreamAlive, handleMcp);
  app.post("/mcp", keepStreamAlive, handleMcp);
  app.delete("/mcp", keepStreamAlive, handleMcp);

  return app;
}

const serverStore = new Map<
  string,
  { server: McpServer; transport: StreamableHTTPServerTransport }
>();

function getSessionIdHeader(req: Request): string | undefined {
  const value = req.headers["mcp-session-id"];
  return Array.isArray(value) ? value[0] : value;
}

async function cleanupSession(sessionId: string) {
  const connection = serverStore.get(sessionId);
  if (!connection) return;
  serverStore.delete(sessionId);
  await connection.server.close().catch(() => {});
}

async function closeAllSessions() {
  const connections = Array.from(serverStore.entries());
  serverStore.clear();
  await Promise.all(
    connections.map(async ([, c]) => {
      await c.transport.close().catch(() => {});
      await c.server.close().catch(() => {});
    })
  );
}

async function handleMcpRequest(
  req: Request,
  res: Response,
  createServerFn: () => McpServer
) {
  const sessionId = getSessionIdHeader(req);
  let connection = sessionId ? serverStore.get(sessionId) : undefined;

  try {
    if (!connection) {
      if (sessionId) {
        res.status(404).send("Session not found");
        return;
      }
      if (req.method !== "POST" || !isInitializeRequest(req.body)) {
        res
          .status(400)
          .send("Start a session by POSTing an initialize request to /mcp.");
        return;
      }

      const server = createServerFn();
      const transport: StreamableHTTPServerTransport =
        new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
          onsessioninitialized: (id) => {
            serverStore.set(id, { server, transport });
          },
          onsessionclosed: async (id) => {
            await cleanupSession(id);
          },
        });
      transport.onclose = () => {
        if (transport.sessionId) void cleanupSession(transport.sessionId);
      };
      transport.onerror = (e) => console.error("MCP transport error:", e);

      await server.connect(transport);
      connection = { server, transport };
    }

    await connection.transport.handleRequest(req, res, req.body);
  } catch (e) {
    console.error("MCP Streamable HTTP error:", e);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: "2.0",
        error: { code: -32603, message: "Internal server error" },
        id: null,
      });
    }
  }
}

export async function startStreamableHTTPServer(
  createServerFn: () => McpServer
) {
  const port = parseInt(process.env.PORT ?? "3001", 10);
  const app = buildApp(createServerFn);
  const httpServer = app.listen(port, (err?: Error) => {
    if (err) {
      console.error("Failed to start server:", err);
      process.exit(1);
    }
    console.log(
      `MCP Streamable HTTP server listening on http://localhost:${port}/mcp`
    );
  });

  const shutdown = () => {
    console.log("\nShutting down...");
    void closeAllSessions().finally(() => {
      httpServer.close(() => process.exit(0));
    });
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

export async function startStdioServer(createServerFn: () => McpServer) {
  await createServerFn().connect(new StdioServerTransport());
}

async function main() {
  if (process.argv.includes("--stdio")) {
    await startStdioServer(createServer);
  } else {
    await startStreamableHTTPServer(createServer);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
