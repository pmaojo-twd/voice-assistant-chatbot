import type { Meta, StoryObj } from "@storybook/react";
import { HelloWorldView } from "@/tools/hello-world/view";
import { createMockApp, withMockMcp } from "../../dev/mocks/withMockMcp";
import {
  helloWorldHostContext,
  helloWorldToolResult,
} from "../../dev/mocks/mcpFixtures";

const meta: Meta<typeof HelloWorldView> = {
  title: "MCP / HelloWorldView (mocked)",
  component: HelloWorldView,
  decorators: [withMockMcp({ hostContext: helloWorldHostContext })],
  parameters: { layout: "fullscreen" },
};

export default meta;

type Story = StoryObj<typeof HelloWorldView>;

const mockApp = createMockApp();

export const Empty: Story = {
  args: {
    app: mockApp,
    toolResult: null,
    hostContext: helloWorldHostContext,
  },
};

export const WithResult: Story = {
  args: {
    app: mockApp,
    toolResult: helloWorldToolResult,
    hostContext: helloWorldHostContext,
  },
};
