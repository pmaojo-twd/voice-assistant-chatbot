# Dev MCP Server

Utilidad local para probar la UI del starter contra un backend MCP real **sin montar infraestructura**. Vive bajo `dev/` porque es ayuda, no producto: no forma parte del starter que entregas, se queda aqui para acelerar el bucle de desarrollo.

## Que hace

- Expone el tool `hello-world` (input validado con Zod) para que la vista pueda hacer un roundtrip real.
- Sirve `dist/mcp-app.html` como MCP resource (`ui://main/mcp-app.html`).
- Dos transportes desde el mismo binario:
  - **HTTP Streamable** (sesion por conexion, cleanup en `SIGINT` / `SIGTERM`).
  - **stdio** (para Claude Desktop, VS Code, Cursor, MCP Inspector).

## Correrlo

```bash
make build-ui              # o: bun run build:ui  (genera dist/mcp-app.html)

make serve                 # HTTP:  http://localhost:3001/mcp
make serve-stdio           # stdio: para clientes MCP locales
make dev                   # UI watch + server en paralelo
```

## Conectarlo a un host

- **MCP Inspector**:
  ```bash
  npx @modelcontextprotocol/inspector bun dev/mcp-server/main.ts --stdio
  ```
- **Claude Desktop / VS Code / Cursor**: apunta el comando stdio a `node dist/index.js --stdio` tras `make build`.
- **Clientes HTTP**: `POST` un `initialize` a `http://localhost:3001/mcp` y sigue las cabeceras de sesion.

## Sustituirlo por tu backend real

La UI no depende de nada de esta carpeta. Cualquier servidor que hable MCP y sirva `mcp-app.html` como resource vale. Pasos tipicos:

1. Copia [server.ts](server.ts), renombra el tool y ajusta el schema Zod.
2. Mete el `McpServer` en tu Express/Fastify/Hono existente.
3. Publica `dist/mcp-app.html` como asset estatico.
