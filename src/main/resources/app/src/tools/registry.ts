/**
 * @file Central Tool Registry
 *
 * @description
 * This registry is the seam between the generic app shell and the tool-specific
 * UI modules.
 *
 * Architectural note:
 * Dynamic imports are intentionally avoided here. Static imports keep the
 * single-file build predictable and make starter customization easier for
 * teammates who are still learning the structure.
 */

import type { ToolManifest } from "@/core/framework/tool-contract";
import { helloWorldManifest } from "./hello-world/manifest";
import { voiceAssistantManifest } from "./voice-assistant/manifest";

/**
 * Array of all actively registered tool manifests.
 */
const manifests: ToolManifest[] = [helloWorldManifest, voiceAssistantManifest];

/**
 * Record mapping a tool slug to the React component that renders its UI.
 */
export const TOOL_COMPONENTS: Record<string, ToolManifest["component"]> =
  manifests.reduce(
    (acc, manifest) => {
      acc[manifest.slug] = manifest.component;
      return acc;
    },
    {} as Record<string, ToolManifest["component"]>
  );
