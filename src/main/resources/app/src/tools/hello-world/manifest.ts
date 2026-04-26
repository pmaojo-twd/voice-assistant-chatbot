import type { ToolManifest } from "@/core/framework/tool-contract";
import { HelloWorldView } from "./view";

export const helloWorldManifest: ToolManifest = {
  slug: "hello-world",
  title: "Hello World",
  description:
    "Starter example showing one server roundtrip and a few host bridge actions.",
  version: "1.0.0",
  component: HelloWorldView,
  config: {
    requiredPermissions: [
      "callServerTool",
      "sendMessage",
      "sendLog",
      "openLink",
    ],
  },
};
