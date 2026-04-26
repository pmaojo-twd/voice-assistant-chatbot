import type { Meta, StoryObj } from "@storybook/react";
import AlertCircle from "lucide-react/dist/esm/icons/alert-circle";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Info from "lucide-react/dist/esm/icons/info";
import Terminal from "lucide-react/dist/esm/icons/terminal";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";

const meta: Meta<typeof Alert> = {
  title: "Guía de Diseño/Alert",
  component: Alert,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Alert className="max-w-md">
      <Terminal className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  ),
};

export const Destructive: StoryObj = {
  render: () => (
    <Alert variant="destructive" className="max-w-md">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  ),
};

export const Informative: StoryObj = {
  render: () => (
    <Alert className="max-w-md border-primary/20 bg-primary/5 text-primary">
      <Info className="h-4 w-4" />
      <AlertTitle className="font-bold">Information</AlertTitle>
      <AlertDescription className="text-xs">
        The MCP server is using a cached version of the data.
      </AlertDescription>
    </Alert>
  ),
};

export const Success: StoryObj = {
  render: () => (
    <Alert className="max-w-md border-emerald-200 bg-emerald-500/5 text-emerald-600">
      <CheckCircle2 className="h-4 w-4" />
      <AlertTitle className="font-bold">Success</AlertTitle>
      <AlertDescription className="text-xs">
        The itinerary has been successfully generated.
      </AlertDescription>
    </Alert>
  ),
};
