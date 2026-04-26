import { useState } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { toast } from "sonner";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import type { ToolComponentProps } from "@/core/framework/tool-contract";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Separator } from "@/shared/components/ui/separator";
import { useServerTool } from "@/shared/hooks/useServerTool";

const HelloWorldPayloadSchema = z.object({
  requestedName: z.string(),
  generatedAt: z.string(),
  serverTimeZone: z.string(),
});

type HelloWorldPayload = z.infer<typeof HelloWorldPayloadSchema>;

function getResultText(
  result: CallToolResult | null | undefined
): string | null {
  if (!result) {
    return null;
  }

  const textBlock = result.content?.find((block) => block.type === "text") as
    | { text: string }
    | undefined;

  return textBlock?.text ?? null;
}

// Keep client-side validation close to the view so the starter shows the full contract boundary.
function parseHelloWorldPayload(
  result: CallToolResult | null | undefined
): HelloWorldPayload | null {
  const rawText = getResultText(result);

  if (!rawText) {
    return null;
  }

  try {
    return HelloWorldPayloadSchema.parse(JSON.parse(rawText));
  } catch {
    return null;
  }
}

function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export function HelloWorldView({
  app,
  toolResult,
  hostContext,
}: ToolComponentProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("World");
  const { activeResult, isError, isLoading, executeTool } = useServerTool(
    app,
    "hello-world",
    toolResult
  );

  const parsedResult = parseHelloWorldPayload(activeResult);
  const hasUnexpectedPayload =
    Boolean(activeResult) && !isError && parsedResult === null;
  const trimmedName = name.trim();
  const fallbackName = trimmedName || "World";

  const handleRunTool = async () => {
    await executeTool(trimmedName ? { name: trimmedName } : {});
  };

  const handleSendMessage = async () => {
    if (!app) {
      toast.error(t("helloWorld.host.appMissing"));
      return;
    }

    try {
      await app.sendMessage({
        role: "user",
        content: [
          {
            type: "text",
            text: t("helloWorld.host.messageBody", {
              name: parsedResult?.requestedName ?? fallbackName,
            }),
          },
        ],
      });
      toast.success(t("helloWorld.host.messageSuccess"));
    } catch (error: unknown) {
      toast.error(
        t("helloWorld.host.actionError", {
          action: t("helloWorld.host.message"),
          message: formatErrorMessage(error),
        })
      );
    }
  };

  const handleSendLog = async () => {
    if (!app) {
      toast.error(t("helloWorld.host.appMissing"));
      return;
    }

    try {
      await app.sendLog({
        level: "info",
        logger: "hello-world",
        data: {
          requestedName: parsedResult?.requestedName ?? fallbackName,
          generatedAt: parsedResult?.generatedAt ?? null,
        },
      });
      toast.success(t("helloWorld.host.logSuccess"));
    } catch (error: unknown) {
      toast.error(
        t("helloWorld.host.actionError", {
          action: t("helloWorld.host.log"),
          message: formatErrorMessage(error),
        })
      );
    }
  };

  const handleOpenDocs = async () => {
    if (!app) {
      toast.error(t("helloWorld.host.appMissing"));
      return;
    }

    try {
      await app.openLink({ url: "https://modelcontextprotocol.io/docs" });
      toast.success(t("helloWorld.host.docsSuccess"));
    } catch (error: unknown) {
      toast.error(
        t("helloWorld.host.actionError", {
          action: t("helloWorld.host.docs"),
          message: formatErrorMessage(error),
        })
      );
    }
  };

  const hostFacts = [
    {
      label: t("helloWorld.context.tool"),
      value:
        hostContext?.toolInfo?.tool?.name ?? t("helloWorld.context.unknown"),
    },
    {
      label: t("helloWorld.context.locale"),
      value: hostContext?.locale ?? t("helloWorld.context.unknown"),
    },
    {
      label: t("helloWorld.context.timeZone"),
      value: hostContext?.timeZone ?? t("helloWorld.context.unknown"),
    },
    {
      label: t("helloWorld.context.theme"),
      value: hostContext?.theme ?? t("helloWorld.context.unknown"),
    },
    {
      label: t("helloWorld.context.displayMode"),
      value: hostContext?.displayMode ?? t("helloWorld.context.unknown"),
    },
    {
      label: t("helloWorld.context.platform"),
      value: hostContext?.platform ?? t("helloWorld.context.unknown"),
    },
  ];

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 md:p-6">
      <Card className="border border-primary/10">
        <CardHeader>
          <Badge variant="secondary" className="w-fit">
            {t("helloWorld.badge")}
          </Badge>
          <CardTitle>{t("helloWorld.title")}</CardTitle>
          <CardDescription>{t("helloWorld.description")}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm text-muted-foreground md:grid-cols-3">
          <p>{t("helloWorld.summary.singleTool")}</p>
          <p>{t("helloWorld.summary.shadcn")}</p>
          <p>{t("helloWorld.summary.microManifest")}</p>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>{t("helloWorld.server.title")}</CardTitle>
            <CardDescription>
              {t("helloWorld.server.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="hello-world-name"
                className="text-sm font-medium text-foreground"
              >
                {t("helloWorld.server.inputLabel")}
              </label>
              <Input
                id="hello-world-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t("helloWorld.server.inputPlaceholder")}
              />
            </div>

            <Button onClick={handleRunTool} disabled={isLoading}>
              {isLoading
                ? t("helloWorld.server.running")
                : t("helloWorld.server.run")}
            </Button>

            <p className="text-sm text-muted-foreground">
              {t("helloWorld.server.hint")}
            </p>

            <Separator />

            {isError && (
              <Alert variant="destructive">
                <AlertTitle>{t("helloWorld.server.errorTitle")}</AlertTitle>
                <AlertDescription>
                  {t("helloWorld.server.error")}
                </AlertDescription>
              </Alert>
            )}

            {hasUnexpectedPayload && (
              <Alert variant="destructive">
                <AlertTitle>
                  {t("helloWorld.server.invalidResponseTitle")}
                </AlertTitle>
                <AlertDescription>
                  {t("helloWorld.server.invalidResponse")}
                </AlertDescription>
              </Alert>
            )}

            {!isError && !hasUnexpectedPayload && parsedResult && (
              <Alert>
                <AlertTitle>{t("helloWorld.result.title")}</AlertTitle>
                <AlertDescription className="space-y-2">
                  <p>
                    {t("helloWorld.result.greeting", {
                      name: parsedResult.requestedName,
                    })}
                  </p>
                  <div className="grid gap-2 text-xs sm:grid-cols-3">
                    <div>
                      <div className="font-medium text-foreground">
                        {t("helloWorld.result.requestedName")}
                      </div>
                      <div>{parsedResult.requestedName}</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {t("helloWorld.result.generatedAt")}
                      </div>
                      <div>{parsedResult.generatedAt}</div>
                    </div>
                    <div>
                      <div className="font-medium text-foreground">
                        {t("helloWorld.result.serverTimeZone")}
                      </div>
                      <div>{parsedResult.serverTimeZone}</div>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {!activeResult && !isLoading && (
              <Alert>
                <AlertTitle>{t("helloWorld.result.title")}</AlertTitle>
                <AlertDescription>
                  {t("helloWorld.result.empty")}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>{t("helloWorld.host.title")}</CardTitle>
            <CardDescription>
              {t("helloWorld.host.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              className="w-full justify-start"
              onClick={handleSendMessage}
            >
              {t("helloWorld.host.message")}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleSendLog}
            >
              {t("helloWorld.host.log")}
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={handleOpenDocs}
            >
              {t("helloWorld.host.docs")}
            </Button>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm text-muted-foreground">
            <p>{t("helloWorld.host.footer")}</p>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>{t("helloWorld.context.title")}</CardTitle>
            <CardDescription>
              {t("helloWorld.context.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {hostFacts.map((fact) => (
              <div
                key={fact.label}
                className="rounded-xl border border-border/60 bg-muted/30 p-3"
              >
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {fact.label}
                </div>
                <div className="mt-1 break-words font-mono text-sm text-foreground">
                  {fact.value}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border/60">
          <CardHeader>
            <CardTitle>{t("helloWorld.nextSteps.title")}</CardTitle>
            <CardDescription>
              {t("helloWorld.nextSteps.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>
              {t("helloWorld.nextSteps.view")}{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">
                src/tools/hello-world/view.tsx
              </code>
            </p>
            <p>
              {t("helloWorld.nextSteps.manifest")}{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">
                src/tools/hello-world/manifest.ts
              </code>
            </p>
            <p>
              {t("helloWorld.nextSteps.server")}{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">
                server/server.ts
              </code>
            </p>
            <p>
              {t("helloWorld.nextSteps.registry")}{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-foreground">
                src/tools/registry.ts
              </code>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
