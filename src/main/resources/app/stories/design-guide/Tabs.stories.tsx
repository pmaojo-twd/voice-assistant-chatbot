import type { Meta, StoryObj } from "@storybook/react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

const meta: Meta<typeof Tabs> = {
  title: "Guía de Diseño/Tabs",
  component: Tabs,
  tags: ["autodocs"],
};

export default meta;

export const Default: StoryObj = {
  render: () => (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="border-none shadow-none">
          <CardHeader className="px-0 pt-4">
            <CardTitle className="text-sm">Account Settings</CardTitle>
            <CardDescription className="text-xs">
              Make changes to your account here.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-2">
            <div className="h-10 bg-muted rounded-md w-full animate-pulse" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card className="border-none shadow-none">
          <CardHeader className="px-0 pt-4">
            <CardTitle className="text-sm">Password Security</CardTitle>
            <CardDescription className="text-xs">
              Ensure your account is safe.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 space-y-2">
            <div className="h-10 bg-muted rounded-md w-full animate-pulse" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const InChatExperience: StoryObj = {
  render: () => (
    <Tabs defaultValue="details" className="w-[300px]">
      <TabsList className="bg-zinc-100 p-1 h-9 items-center justify-center rounded-lg">
        <TabsTrigger value="details" className="text-[11px] h-7 px-4">
          Detalles
        </TabsTrigger>
        <TabsTrigger value="logs" className="text-[11px] h-7 px-4">
          Logs
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="details"
        className="pt-2 text-xs text-muted-foreground italic"
      >
        Viewing itinerary details for day 1...
      </TabsContent>
      <TabsContent
        value="logs"
        className="pt-2 font-mono text-[10px] text-primary"
      >
        [TOOL_CALL] search_destinations... [OK: 200]
      </TabsContent>
    </Tabs>
  ),
};
