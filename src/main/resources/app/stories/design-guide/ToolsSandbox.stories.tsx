import type { Meta, StoryObj } from "@storybook/react";
import { TOOL_COMPONENTS } from "@/tools/registry";
import type { App, McpUiHostContext } from "@modelcontextprotocol/ext-apps";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

/**
 * **Tools Sandbox**
 *
 * This story simulates a host environment and mounts one registered MCP tool at
 * a time. It is the quickest place to sanity-check a tool view without running
 * a real host.
 */
const ToolsSandbox = ({
  selectedToolSlug,
  mockToolResult,
}: {
  selectedToolSlug: string;
  mockToolResult: string;
}) => {
  const SelectedComponent = TOOL_COMPONENTS[selectedToolSlug];

  if (!SelectedComponent) {
    return (
      <div className="rounded-md border border-destructive bg-destructive/10 p-4 text-destructive">
        Error: No component registered for tool slug "{selectedToolSlug}".
      </div>
    );
  }

  let parsedToolResult: CallToolResult | null = null;
  try {
    if (mockToolResult) {
      parsedToolResult = JSON.parse(mockToolResult) as CallToolResult;
    }
  } catch (error) {
    console.error("Failed to parse mockToolResult JSON", error);
    parsedToolResult = {
      content: [{ type: "text", text: `[JSON Parse Error]: ${error}` }],
      isError: true,
    };
  }

  const mockHostContext: McpUiHostContext = {
    toolInfo: {
      tool: {
        name: selectedToolSlug,
      } as NonNullable<McpUiHostContext["toolInfo"]>["tool"],
    },
    locale: "en-US",
    timeZone: "UTC",
    theme: "light",
    displayMode: "inline",
    platform: "web",
  };

  const fallbackToolResult: CallToolResult = parsedToolResult ?? {
    content: [
      {
        type: "text",
        text: JSON.stringify(
          {
            requestedName: "Storybook",
            generatedAt: new Date().toISOString(),
            serverTimeZone: "UTC",
          },
          null,
          2
        ),
      },
    ],
  };

  const mockApp = {
    sendMessage: async () => ({ content: [] }),
    sendLog: async () => undefined,
    openLink: async () => ({}),
    callServerTool: async () => fallbackToolResult,
    getHostContext: () => mockHostContext,
  } as unknown as App;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground">
        <p>
          <strong>Host environment:</strong> Storybook sandbox
        </p>
        <p>
          <strong>Mounted tool:</strong> {selectedToolSlug}
        </p>
      </div>

      <div className="relative rounded-xl border border-dashed p-6">
        <div className="absolute -top-3 left-4 bg-background px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Rendered tool UI
        </div>

        <SelectedComponent
          app={mockApp}
          toolResult={parsedToolResult}
          hostContext={mockHostContext}
        />
      </div>
    </div>
  );
};

const meta = {
  title: "Guia de Diseno/Herramientas (Tools)/Sandbox Host",
  component: ToolsSandbox,
  parameters: {
    layout: "padded",
  },
  argTypes: {
    selectedToolSlug: {
      control: "select",
      options: Object.keys(TOOL_COMPONENTS),
      description: "The tool slug to render inside the sandbox.",
    },
    mockToolResult: {
      control: "text",
      description:
        "JSON representing the CallToolResult returned by the server.",
    },
  },
} satisfies Meta<typeof ToolsSandbox>;

export default meta;
type Story = StoryObj<typeof meta>;

const availableTools = Object.keys(TOOL_COMPONENTS);
const firstTool = availableTools.length > 0 ? availableTools[0] : "";

export const Default: Story = {
  args: {
    selectedToolSlug: firstTool,
    mockToolResult: JSON.stringify(
      {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                requestedName: "Storybook",
                generatedAt: new Date().toISOString(),
                serverTimeZone: "UTC",
              },
              null,
              2
            ),
          },
        ],
      },
      null,
      2
    ),
  },
};

export const HelloWorldExample: Story = {
  args: {
    selectedToolSlug: "hello-world",
    mockToolResult: JSON.stringify(
      {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                requestedName: "OpenAI",
                generatedAt: new Date().toISOString(),
                serverTimeZone: "UTC",
              },
              null,
              2
            ),
          },
        ],
      },
      null,
      2
    ),
  },
};
