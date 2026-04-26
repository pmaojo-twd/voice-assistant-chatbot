# MCP App Vite Starter

Starter minimalista y **honesto** para construir MCP Apps con React, Vite y shadcn, empaquetadas como un unico `mcp-app.html`.

La idea no es enseñar diez demos distintas ni impresionar con arquitectura imposible de mantener. Es dejar una base pequeña, tipada, con los problemas reales ya resueltos (HMR, cache de resultados, tema del host, i18n, mocks sin servidor) para que tu equipo clone, borre lo que no use y entregue producto.

---

## Features

### UI y producto

- **React 19 + TypeScript strict**. Nada de `any`, `tsc --noEmit` pasa limpio.
- **Tailwind v4 + shadcn**. 33 primitivas listas en [src/shared/components/ui/](src/shared/components/ui/): `button`, `dialog`, `dropdown-menu`, `popover`, `sidebar`, `carousel`, `accordion`, `sonner` (toasts), `skeleton`, `switch`, `slider`, `select`, `tooltip`, `pagination`, `breadcrumb`… todas compuestas con Radix UI, accesibles por defecto.
- **Dark / light automatico** sincronizado con el host. [McpProvider](src/core/mcp/McpProvider.tsx) escucha `hostContext.theme` y alterna la clase `.dark` en `<html>` — sin `next-themes` ni flicker.
- **i18n de serie** con `react-i18next` + detector de idioma del navegador. Incluye `en` y `es` en [src/locales/](src/locales/); añadir uno nuevo es soltar un JSON.
- **Toasts con `sonner`** ya cableados al `logger`: cualquier `logger.error` muestra toast + `console.error` + envio al host MCP.

### Integracion con el host MCP

- **`useApp` del SDK oficial** (`@modelcontextprotocol/ext-apps/react`) envuelto en un unico `McpProvider` que expone `{ app, error, hostContext, toolResult }`.
- **Cache de `toolResult` en `sessionStorage` + `useSyncExternalStore`**: el host solo dispara el resultado una vez; aqui sobrevive a HMR, recarga y navegacion forward/back.
- **Cleanup del logger** al desmontar el provider — el `logger` nunca queda apuntando a una `App` muerta.
- **Estilos del host** propagados via `useHostStyles` (tokens CSS custom properties) para que tu UI herede el look del cliente.
- **Registro de tools dinamico** en [src/tools/registry.ts](src/tools/registry.ts). El shell lee `hostContext.toolInfo.tool.name` y resuelve el componente — añadir una tool es una linea.

### Utilidades de desarrollo (`dev/`)

`dev/` es el espacio para **todo lo que ayuda a desarrollar pero no es parte del runtime** del starter. Si mañana añades un generador de fixtures, un script de validacion o un seeder, va aqui.

Hoy contiene:

- **[dev/mcp-server/](dev/mcp-server/)** — backend MCP local para probar la UI end-to-end sin infra externa:
  - Doble transporte: HTTP Streamable (`make serve`) y stdio (`make serve-stdio`) desde el mismo binario.
  - API declarativa con `registerAppTool` / `registerAppResource`.
  - Validacion con Zod v4 en la frontera.
  - Sesiones HTTP por conexion con `StreamableHTTPServerTransport` y cleanup limpio en `SIGINT` / `SIGTERM`.
- **[dev/mocks/](dev/mocks/)** — `withMockMcp`, `createMockApp` y fixtures para Storybook y tests (ver siguiente seccion).

Complementa a la UI con el **hook [useServerTool](src/shared/hooks/useServerTool.ts)**, que unifica estado local + resultados empujados por el host en una sola API (`{ activeResult, isError, isLoading, executeTool }`).

### Dev experience sin servidor MCP

- **Storybook** preconfigurado ([.storybook/](.storybook/)) con stories de cada componente shadcn y ejemplos MCP.
- **Mocks de contexto MCP** en [dev/mocks/](dev/mocks/): decorator `withMockMcp` + `createMockApp()` que devuelven un `McpContext` falso. Previsualizas vistas completas de tools **sin levantar servidor, sin bridge, sin postMessage**. Vive fuera de `src/`, no contamina el bundle de produccion y esta disponible tambien para tests.
- **Build single-file**: `vite-plugin-singlefile` emite `dist/mcp-app.html` con todo inline — un solo recurso que el host MCP sirve.
- **HMR + watch** concurrente: `bun run dev` levanta Vite watch + server en paralelo (`concurrently`).

### Calidad

- **ESLint 9 flat config** + `eslint-plugin-react-hooks` + `react-refresh`.
- **Prettier** + **Husky** + **lint-staged**: formatea y arregla en cada commit.
- **Vitest** con `jsdom` + Testing Library. Tests del `McpProvider` ya incluidos en [test/core/mcp/](test/core/mcp/).
- **TypeDoc** para generar docs tipadas (`bun run build:docs`).
- **`tsc --noEmit`** como gate del `build:ui`.

---

## Stack

- React 19 · TypeScript 5.9 · Vite 6 · Bun
- `@modelcontextprotocol/ext-apps` 1.5 · `@modelcontextprotocol/sdk` 1.24
- Express 5 · Zod 4
- Tailwind v4 · shadcn · Radix UI · `sonner`
- i18next + `i18next-browser-languagedetector`
- Storybook 8 · Vitest 4 · ESLint 9 · Prettier 3

---

## Estructura

```text
.
|-- dev/                           # Utilidades de desarrollo (no entran en build)
|   |-- mcp-server/                # Backend MCP local para probar la UI end-to-end
|   |   |-- main.ts                # HTTP Streamable o --stdio
|   |   |-- server.ts              # registerAppTool / registerAppResource
|   |   `-- README.md              # Como correrlo y como sustituirlo
|   `-- mocks/                     # withMockMcp, createMockApp, fixtures compartidos
|-- src/
|   |-- mcp-app.tsx                # Shell de la UI, router por slug
|   |-- i18n.ts                    # Setup react-i18next
|   |-- core/mcp/
|   |   |-- McpProvider.tsx        # useApp + cache + theme + logger
|   |   `-- logger.ts              # info/warn/error -> toast + console + host
|   |-- shared/
|   |   |-- components/ui/         # 33 primitivas shadcn
|   |   `-- hooks/useServerTool.ts # Patron unificado tool-call + toolResult
|   |-- locales/                   # en, es
|   |-- tools/
|   |   |-- hello-world/
|   |   |   |-- manifest.ts        # Slug + metadata + componente
|   |   |   `-- view.tsx           # Vista React del tool
|   |   `-- registry.ts            # Registro central
|   `-- index.css                  # Tokens + capa base Tailwind
|-- stories/
|   |-- mcp/                       # Stories con contexto MCP mockeado (usan dev/mocks)
|   `-- design-guide/              # Stories de primitivas shadcn
|-- test/
`-- mcp-app.html                   # HTML que Vite compila a single-file
```

---

## Comandos

El [Makefile](Makefile) envuelve los flujos habituales. `make help` lista todo:

```bash
make install          # bun install
make dev              # Vite watch + dev server en paralelo
make storybook        # UI sin servidor MCP (http://localhost:6006)
make serve            # Solo HTTP Streamable (http://localhost:3001/mcp)
make serve-stdio      # Solo stdio (Claude Desktop, VS Code, Cursor)

make lint             # ESLint
make format           # Prettier --write
make test             # Vitest
make typecheck        # tsc --noEmit de UI + server
make check            # lint + typecheck + test (gate de PR)

make build-ui         # dist/mcp-app.html single-file
make build            # UI + server a dist/
make build-storybook  # Storybook estatico
make build-docs       # TypeDoc

make clean            # Borra dist, storybook-static, docs
```

Si no tienes `make` (Windows puro sin Git Bash ni WSL), los mismos comandos existen como `bun run <script>` — mira [package.json](package.json).

---

## Como funciona

1. [dev/mcp-server/server.ts](dev/mcp-server/server.ts) registra `hello-world` + la resource `ui://main/mcp-app.html`.
2. El cliente MCP pide la UI y recibe el HTML single-file.
3. [src/mcp-app.tsx](src/mcp-app.tsx) lee `hostContext.toolInfo.tool.name`.
4. [src/tools/registry.ts](src/tools/registry.ts) resuelve el componente React.
5. La vista usa `useServerTool` para llamar de vuelta al server y `app.sendMessage` / `app.sendLog` / `app.openLink` para hablar con el host.

> El server de `dev/` no es obligatorio. Si ya tienes un backend MCP, conectalo y apuntalo a `dist/mcp-app.html`.

---

## Flujo recomendado para el equipo

1. Sustituye el layout y la logica de [src/tools/hello-world/view.tsx](src/tools/hello-world/view.tsx).
2. Renombra slug y metadata en [src/tools/hello-world/manifest.ts](src/tools/hello-world/manifest.ts).
3. Cambia el contrato del server en [dev/mcp-server/server.ts](dev/mcp-server/server.ts) (o conecta el tuyo).
4. Para una segunda tool: duplica la carpeta y registrala en [src/tools/registry.ts](src/tools/registry.ts).
5. Para previsualizar sin servidor: copia [stories/mcp/HelloWorldView.stories.tsx](stories/mcp/HelloWorldView.stories.tsx) y adapta los fixtures.

---

## Checklist de PR

```bash
make check              # lint + typecheck + test
make build-ui           # si solo tocas UI
make build              # si tocas tools, contratos MCP o dev/mcp-server
```

---

## Por que este starter y no otro

- **No hay magia**. Un unico tool, un unico provider, un unico registro. Lees el repo entero en una tarde.
- **Los problemas raros ya estan resueltos**: cache de `toolResult`, tema sincronizado, cleanup del logger, validacion en la frontera, tipado estricto.
- **Dev sin servidor**: Storybook + mocks del contexto MCP — tu frontend avanza aunque el backend todavia no exista.
- **Build single-file real**: un `.html` que el host sirve. Sin CDN, sin rutas, sin dolores.
- **Lo que sobra se borra**. El repo ya paso por una poda: `get-time`, `host-bridge`, `list-files`, `learn-mcp` fuera. Lo que queda, se usa.
