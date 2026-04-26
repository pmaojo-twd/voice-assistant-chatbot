import type { Meta, StoryObj } from "@storybook/react";
import { CodeBlock } from "@/shared/components/ui/code-block";

/**
 * `CodeBlock` displays code snippets with a dark surface and monospace typography.
 * It is useful in MCP tool flows that expose queries, config, or payloads.
 *
 * ### When to use
 * - MCP tool results that return code or JSON.
 * - Technical setup instructions for the user.
 */
const meta: Meta<typeof CodeBlock> = {
  title: "Guia de Diseno/Componentes/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  argTypes: {
    language: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const JSON_: Story = {
  name: "JSON",
  args: {
    language: "json",
    code: JSON.stringify(
      {
        proposal_id: "prop_882",
        client: "Pelayo Casanova",
        destination: "Ibiza",
        budget: 12000,
        status: "draft",
      },
      null,
      2
    ),
  },
};

export const SQL: Story = {
  args: {
    language: "sql",
    code: "SELECT * FROM proposals\nWHERE client_id = 882\n  AND status = 'active'\nORDER BY created_at DESC\nLIMIT 5;",
  },
};

export const Bash: Story = {
  args: {
    language: "bash",
    code: "npx mcp-server start --port 3000 --config ./mcp.config.json",
  },
};
