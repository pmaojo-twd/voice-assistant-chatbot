import type { Meta, StoryObj } from "@storybook/react";
import Activity from "lucide-react/dist/esm/icons/activity";
import AlertCircle from "lucide-react/dist/esm/icons/alert-circle";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import Cloud from "lucide-react/dist/esm/icons/cloud";
import Database from "lucide-react/dist/esm/icons/database";
import Layers from "lucide-react/dist/esm/icons/layers";
import Play from "lucide-react/dist/esm/icons/play";
import Search from "lucide-react/dist/esm/icons/search";
import Server from "lucide-react/dist/esm/icons/server";
import Settings2 from "lucide-react/dist/esm/icons/settings-2";
import Terminal from "lucide-react/dist/esm/icons/terminal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { CodeBlock } from "@/shared/components/ui/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

/**
 * # MCP App Rich Examples
 *
 * This showcase demonstrates how shadcn/ui components can be combined
 * to build richer internal tools and in-chat MCP experiences.
 */
const meta: Meta = {
  title: "Guía de Diseño/Patrones MCP en contexto",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj;

/**
 * ## Tool Execution Monitor
 * Shows a tool being called, its arguments, and its result with status indicators.
 */
export const ToolMonitor: Story = {
  render: () => (
    <div className="w-[600px] space-y-6">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader className="bg-primary/5 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Terminal className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <CardTitle className="text-lg">execute_query</CardTitle>
                <CardDescription>PostgreSQL Server MCP</CardDescription>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="animate-pulse bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
            >
              Running
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs uppercase text-muted-foreground font-bold tracking-wider">
              Arguments
            </Label>
            <CodeBlock
              language="json"
              code={JSON.stringify(
                {
                  query: "SELECT * FROM users WHERE active = true LIMIT 5;",
                  database: "production_db",
                },
                null,
                2
              )}
            />
          </div>
          <div className="flex items-center gap-2 py-2">
            <Activity className="h-4 w-4 text-muted-foreground animate-spin" />
            <span className="text-sm text-muted-foreground font-medium">
              Fetching 5 rows from production_db...
            </span>
          </div>
        </CardContent>
        <CardFooter className="border-t bg-muted/5 justify-between py-3">
          <span className="text-xs text-muted-foreground">
            Call ID: req_9a8b7c
          </span>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            Cancel Call
          </Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

/**
 * ## MCP Server Health Dashboard
 * A grid showing the status, memory usage, and latency of active MCP servers.
 */
export const ServerHealth: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl p-6 bg-muted/30 rounded-2xl border">
      {[
        {
          name: "PostgreSQL Connector",
          status: "Healthy",
          latency: "12ms",
          uptime: "14d 2h",
          icon: Database,
        },
        {
          name: "File System API",
          status: "Warning",
          latency: "245ms",
          uptime: "2d 4h",
          icon: Layers,
        },
        {
          name: "Cloud Integration",
          status: "Healthy",
          latency: "88ms",
          uptime: "92d 11h",
          icon: Cloud,
        },
        {
          name: "Custom Toolset",
          status: "Down",
          latency: "N/A",
          uptime: "0s",
          icon: Settings2,
        },
      ].map((server) => {
        const isHealthy = server.status === "Healthy";
        const isWarning = server.status === "Warning";

        let statusColor = "rose";
        if (isHealthy) statusColor = "emerald";
        else if (isWarning) statusColor = "amber";

        return (
          <Card
            key={server.name}
            className="overflow-hidden group hover:border-primary/50 transition-all cursor-pointer hover:shadow-md"
            role="button"
            tabIndex={0}
            aria-label={`View status for ${server.name}`}
          >
            <CardHeader className="flex w-full flex-row items-center justify-between p-4 pb-0 space-y-0">
              <div className="p-2 bg-muted rounded-md group-hover:bg-primary/10 transition-colors">
                <server.icon
                  className="h-4 w-4 text-muted-foreground group-hover:text-primary"
                  aria-hidden="true"
                />
              </div>
              <div
                className={`h-2 w-2 rounded-full bg-${statusColor}-500 shadow-[0_0_8px] shadow-${statusColor}-500`}
                aria-label={`Server status: ${server.status}`}
                role="img"
              />
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div>
                <CardTitle className="text-sm font-bold">
                  {server.name}
                </CardTitle>
                <CardDescription className="text-xs">
                  {server.status} • {server.latency}
                </CardDescription>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase text-muted-foreground font-bold">
                    Uptime
                  </span>
                  <p className="text-xs font-medium tabular-nums">
                    {server.uptime}
                  </p>
                </div>
                <div className="h-10 w-24 bg-muted/30 rounded flex items-end p-1 gap-0.5">
                  {[4, 7, 3, 5, 8, 4, 6, 9].map((h, i) => {
                    const barId = `bar-${i}`;
                    const barHeight = `${h * 10}%`;
                    return (
                      <div
                        key={barId}
                        className="flex-1 bg-primary/20 rounded-t-sm group-hover:bg-primary/40 transition-colors"
                        style={{ height: barHeight }}
                      />
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  ),
};

/**
 * ## Multi-Step Reasoning Graph
 * Visualizing how an AI agent uses multiple MCP tools in sequence.
 */
export const ToolSequence: Story = {
  render: () => (
    <div className="w-[500px] border rounded-2xl bg-card p-6 shadow-xl space-y-0 relative">
      {[
        {
          step: 1,
          tool: "search_docs",
          status: "done",
          text: "Finding documentation for API auth",
          icon: Search,
        },
        {
          step: 2,
          tool: "get_config",
          status: "done",
          text: "Retrieving server environment variables",
          icon: Layers,
        },
        {
          step: 3,
          tool: "test_connection",
          status: "error",
          text: "Connection refused from 'staging-env'",
          icon: AlertCircle,
        },
        {
          step: 4,
          tool: "list_logs",
          status: "pending",
          text: "Retrieving error logs from logs-mcpserver",
          icon: Terminal,
        },
      ].map((item, idx, arr) => {
        const isDone = item.status === "done";
        const isError = item.status === "error";

        let indicatorColorClass =
          "bg-muted border-muted-foreground/20 text-muted-foreground animate-pulse";
        if (isDone)
          indicatorColorClass = "bg-emerald-500 border-emerald-500 text-white";
        else if (isError)
          indicatorColorClass = "bg-rose-500 border-rose-500 text-white";

        const descriptionColorClass = isError
          ? "text-rose-600 font-semibold italic"
          : "text-foreground";

        let statusIcon = <Activity className="h-4 w-4" aria-hidden="true" />;
        if (isDone) {
          statusIcon = <CheckCircle2 className="h-4 w-4" aria-hidden="true" />;
        } else if (isError) {
          statusIcon = <AlertCircle className="h-4 w-4" aria-hidden="true" />;
        }

        return (
          <div key={item.step} className="flex gap-4 relative">
            {idx !== arr.length - 1 && (
              <div className="absolute left-[15px] top-8 bottom-0 w-[2px] bg-muted-foreground/20" />
            )}
            <div
              className={`z-10 h-8 w-8 rounded-full flex items-center justify-center shrink-0 border-2 ${indicatorColorClass}`}
            >
              {statusIcon}
            </div>
            <div className="pb-8 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-primary px-1.5 py-0.5 bg-primary/5 rounded border border-primary/10">
                  {item.tool}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">
                  STEP {item.step}
                </span>
              </div>
              <p className={`text-sm ${descriptionColorClass}`}>{item.text}</p>
            </div>
          </div>
        );
      })}
      <div className="pt-2 border-t mt-4 flex justify-end gap-2">
        <Button variant="outline" size="sm" className="h-8">
          Explain Issue
        </Button>
        <Button size="sm" className="h-8 shadow-sm">
          Retry Pipeline
        </Button>
      </div>
    </div>
  ),
};

/**
 * ## MCP Configuration Settings
 * Interactive form for configuring an MCP server in the client.
 */
export const ServerSettings: Story = {
  render: () => (
    <Card className="max-w-md border-none shadow-none">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-3 bg-muted rounded-xl">
            <Server className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <CardTitle>Github MCP Server</CardTitle>
            <CardDescription>
              Configure your repository and token.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="access" className="w-full">
          <TabsList className="grid grid-cols-2 w-full h-9 p-1">
            <TabsTrigger value="access" className="text-xs">
              Access Control
            </TabsTrigger>
            <TabsTrigger value="resources" className="text-xs">
              Resource Filter
            </TabsTrigger>
          </TabsList>
          <TabsContent value="access" className="pt-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="token">Personal Access Token</Label>
              <div className="relative">
                <Input
                  id="token"
                  type="password"
                  placeholder="ghp_xxxxxxxxxxxx"
                  defaultValue="pk_test_12345"
                  readOnly
                  className="pr-10"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:bg-transparent"
                  aria-label="Toggle token visibility"
                >
                  <Play className="h-4 w-4 rotate-90" aria-hidden="true" />
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground">
                Tokens are encrypted locally and never sent to our servers.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="org">Github Organization</Label>
              <Input id="org" placeholder="e.g. thewisedreams" />
            </div>
          </TabsContent>
          <TabsContent value="resources" className="pt-4">
            <Alert
              variant="default"
              className="bg-amber-50 group border-amber-200 dark:bg-amber-950/20 dark:border-amber-900"
            >
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertTitle className="text-amber-800 dark:text-amber-400 font-bold">
                Permissions Required
              </AlertTitle>
              <AlertDescription className="text-amber-700/80 dark:text-amber-400/80 text-xs">
                Selected organization requires admin scope to list protected
                branches.
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full h-11 text-base shadow-lg shadow-primary/20">
          Save Configuration
        </Button>
        <Button variant="ghost" className="w-full text-zinc-500 h-9">
          Uninstall Server
        </Button>
      </CardFooter>
    </Card>
  ),
};
