# AGENTS.md

Preserva los patrones ya presentes en el repo. Cuando haya varias opciones, prioriza simplicidad, bundle pequeno y cambios locales.

## Stack

- React 19 + TypeScript strict + Vite 6 + Bun.
- MCP Apps SDK + Express + Zod.
- Tailwind v4 + shadcn/Base UI/Radix + i18next.
- Storybook para sandbox UI, Vitest para tests.
- La UI se entrega como un solo `mcp-app.html`: cualquier cambio debe respetar ese modo de build.

## Prioridades

- Optimiza first render y tamano del bundle antes que abstracciones elegantes.
- Manten la arquitectura micro-manifest: cada tool vive en `src/tools/<tool>/`.
- Prefiere cambios aditivos y locales; evita tocar `src/mcp-app.tsx`, `src/tools/registry.ts` o `src/core/mcp/McpProvider.tsx` sin necesidad real.

## React y rendimiento

- No uses `useEffect` para estado derivado, transforms sincronos ni acciones iniciadas por el usuario.
- Deriva durante render; mueve la logica de interaccion a event handlers.
- Inicia trabajo async pronto y haz `await` tarde; usa `Promise.all` si no hay dependencia real.
- Usa `startTransition` para updates no urgentes y `useDeferredValue` cuando una vista cara bloquee inputs.
- No agregues `useMemo` o `useCallback` por reflejo; usalos solo si evitan trabajo real o estabilizan una API sensible.
- Hoist de constantes, config, regex, arrays y JSX estatico fuera del componente.
- Evita componentes inline dentro de otros componentes.
- Usa lazy init en `useState` y functional updates cuando dependas del estado previo.

## Bundle y carga

- Evita barrel imports en rutas criticas; importa el modulo o icono concreto.
- Las librerias pesadas deben cargarse solo donde se usan y lo mas tarde posible.
- No introduzcas dependencias que necesiten assets externos, multiples chunks o runtime especial si rompen el build single-file.
- En `src/tools/registry.ts` manten imports estaticos salvo razon muy solida y validada con build.

## MCP y arquitectura

- `manifest.slug` debe coincidir exactamente con el nombre del tool registrado en `server/server.ts`.
- Cada tool nuevo debe exponer al menos `manifest.ts` y `view.tsx`.
- `src/mcp-app.tsx` actua como router: no metas logica de feature ahi.
- Usa `McpProvider`, `useMcp` y `useServerTool` antes de crear bridges o stores paralelos.
- Manten estables `resourceUri`, nombres de tools y contratos entre server y UI.

## UI y DX

- Dentro de `src`, usa imports con alias `@/`.
- Reutiliza `src/shared/components/ui` antes de crear primitivas nuevas.
- Disena mobile-first: el host puede renderizar la app en un iframe estrecho.
- Usa tokens, CSS variables y utilidades existentes antes de hardcodear colores, spacing o tipografia.
- Todo texto visible al usuario debe ir por `i18next` en cambios nuevos o pantallas nuevas.

## Server y datos

- Valida inputs con Zod en el server.
- Minimiza lo que viaja al cliente; si algo puede resolverse en el tool/server, hazlo ahi.
- Para filesystem, URLs o paths, valida limites explicitos y bloquea path traversal.
- Evita estado mutable global compartido entre sesiones salvo cache deliberada, segura y justificada.

## Checklist

- `bun run lint`
- `bun run test`
- `bun run build` si solo toca UI
- `bun run build:full` si toca server, registro de tools o contratos MCP
