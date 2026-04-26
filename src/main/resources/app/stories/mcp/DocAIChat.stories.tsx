import type { Meta, StoryObj } from "@storybook/react";
import BrainCircuit from "lucide-react/dist/esm/icons/brain-circuit";
import Database from "lucide-react/dist/esm/icons/database";
import FileText from "lucide-react/dist/esm/icons/file-text";
import MessageSquare from "lucide-react/dist/esm/icons/message-square";
import MoreVertical from "lucide-react/dist/esm/icons/more-vertical";
import Plus from "lucide-react/dist/esm/icons/plus";
import Search from "lucide-react/dist/esm/icons/search";
import SearchCode from "lucide-react/dist/esm/icons/search-code";
import Send from "lucide-react/dist/esm/icons/send";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Sparkles from "lucide-react/dist/esm/icons/sparkles";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import { CodeBlock } from "@/shared/components/ui/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { cn } from "@/lib/utils";

const meta: Meta = {
  title: "MCP / Doc AI Chat Simulation",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

/**
 * # Doc AI Chat Simulation
 *
 * This example simulates a conversation where an AI agent interacts with a Knowledge Base
 * (MCP Knowledge Graph or Vector Store) to answer questions about specific documents.
 * It demonstrates deep data extraction and RAG patterns.
 */
export const Simulation: StoryObj = {
  render: () => (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans overflow-hidden">
      {/* Sidebar: Knowledge Base Explorer */}
      <aside className="w-72 border-r bg-white dark:bg-zinc-900 flex flex-col shrink-0 hidden md:flex">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 bg-primary/10 rounded-lg">
              <Database className="size-4 text-primary" />
            </div>
            <h2 className="font-bold text-sm tracking-tight">Knowledge Base</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
            <Input
              placeholder="Filter by name..."
              className="pl-9 h-8 text-[11px] bg-zinc-50 dark:bg-zinc-950 border-none shadow-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {[
            { name: "Legal_Framework_v2.pdf", tag: "Legal", active: true },
            { name: "Project_Timeline.xlsx", tag: "Mgmt", active: false },
            { name: "User_Feedback_Q1.json", tag: "Prod", active: false },
            { name: "Competitor_Audit.pdf", tag: "Res", active: false },
          ].map((doc) => (
            <div
              key={doc.name}
              className={cn(
                "flex items-center gap-2.5 p-2 rounded-xl transition-all cursor-pointer group border border-transparent",
                doc.active
                  ? "bg-primary/5 border-primary/20"
                  : "hover:bg-zinc-50 dark:hover:bg-zinc-800"
              )}
            >
              <div
                className={cn(
                  "p-2 rounded-lg border shadow-sm transition-colors",
                  doc.active
                    ? "bg-white dark:bg-zinc-800 border-primary/30"
                    : "bg-white dark:bg-zinc-800 opacity-60"
                )}
              >
                <FileText
                  className={cn(
                    "size-3.5",
                    doc.active ? "text-primary" : "text-muted-foreground"
                  )}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={cn(
                    "text-[12px] truncate",
                    doc.active ? "font-bold" : "font-medium"
                  )}
                >
                  {doc.name}
                </p>
                <div className="flex items-center gap-1.5">
                  <Badge
                    variant="outline"
                    className="text-[9px] px-1 h-3.5 border-zinc-200"
                  >
                    {doc.tag}
                  </Badge>
                  {doc.active && (
                    <span className="size-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t bg-zinc-50 dark:bg-zinc-800/10 shrink-0">
          <Button
            variant="outline"
            className="w-full h-9 gap-2 border-dashed text-[11px] bg-white dark:bg-zinc-900"
            size="sm"
          >
            <Plus className="size-3" />
            Index New File
          </Button>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col relative">
        <header className="h-14 border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center px-6 justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-sm">Document Analysis Session</h1>
            <Badge
              variant="outline"
              className="text-[10px] font-mono opacity-60 border-none px-0"
            >
              #eu-reg-194
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="size-8">
              <ShieldCheck className="size-4 text-emerald-500" />
            </Button>
            <Button variant="ghost" size="icon" className="size-8">
              <MoreVertical className="size-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 max-w-3xl mx-auto w-full pb-40 scroll-smooth">
          {/* User Message */}
          <div className="flex justify-end animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="bg-primary text-primary-foreground p-4 rounded-2xl rounded-tr-sm shadow-lg max-w-lg">
              <p className="text-sm leading-relaxed">
                Analyze the{" "}
                <span className="font-bold underline underline-offset-2">
                  Legal_Framework_v2.pdf
                </span>
                . What are the main risks identified for the transition period
                ending in 2026?
              </p>
            </div>
          </div>

          {/* AI Reasoning Loop */}
          <div className="flex gap-4 animate-in fade-in slide-in-from-left-4 duration-500">
            <div className="size-8 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0 flex items-center justify-center border shadow-sm">
              <BrainCircuit className="size-4 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div className="space-y-6 flex-1 pt-1">
              {/* Tool Calling Simulation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground italic">
                  <SearchCode className="size-3.5 animate-pulse text-primary" />
                  Executing{" "}
                  <span className="font-mono bg-zinc-100 dark:bg-zinc-800 px-1 rounded">
                    knowledge_query
                  </span>
                  ...
                </div>

                {/* Tool Results Inline (Hidden/Collapsed simulation) */}
                <div className="p-3 border-l-2 border-primary/20 bg-primary/5 rounded-r-lg">
                  <p className="text-[11px] text-muted-foreground font-mono leading-tight">
                    SEARCHING: "transition period 2026" "risks" <br />
                    MATCHES: 3 Blocks in Sections 4.2, 5.1 <br />
                    SCORES: [0.94, 0.88, 0.82]
                  </p>
                </div>
              </div>

              {/* Final AI Response with rich components */}
              <div className="space-y-6">
                <p className="text-sm leading-relaxed">
                  Based on the content extraction, here is a consolidated risk
                  assessment for the 2026 transition period:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-rose-200 dark:border-rose-900 bg-rose-50/30 dark:bg-rose-950/10 shadow-none">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <AlertCircle className="size-4 text-rose-500" />
                        Liability Gap
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        Clauses in Section 4 leave a potential liability window
                        between Aug-Dec 2026 if the decentralized audits are not
                        completed.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-amber-200 dark:border-amber-900 bg-amber-50/30 dark:bg-amber-950/10 shadow-none">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="size-4 text-amber-500" />
                        Indexing Lag
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-[11px] text-zinc-600 dark:text-zinc-400">
                        Data sovereignty requirements on Q3 2026 might exceed
                        our current local-first ingestion capacity.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-primary" />
                    <h4 className="text-[13px] font-bold">Metadata Extract</h4>
                  </div>
                  <CodeBlock
                    language="json"
                    code={JSON.stringify(
                      {
                        target_date: "2026-12-31",
                        risk_level: "medium-high",
                        relevant_sections: ["4.2", "5.1.1"],
                        suggested_action:
                          "Renew decentralized storage protocols before Q2.",
                      },
                      null,
                      2
                    )}
                  />
                </div>

                <Alert className="bg-primary/5 border-primary/20">
                  <MessageSquare className="size-4 text-primary" />
                  <AlertTitle className="text-xs font-bold">
                    Follow-up Idea
                  </AlertTitle>
                  <AlertDescription className="text-xs">
                    Shall I draft an amendment for the section 4 liability gap
                    or list the compliance tasks for Q3?
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Input area */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4 z-30">
          <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-2 shadow-2xl ring-1 ring-black/5 flex items-end gap-2 pr-4 transition-all focus-within:ring-primary/20">
            <div className="flex-1 pb-1 pl-3">
              <input
                type="text"
                placeholder="Draft the amendment for Section 4..."
                className="w-full bg-transparent border-none focus:outline-none text-sm h-10"
                readOnly
              />
            </div>
            <Button
              size="icon"
              className="size-10 rounded-xl mb-1 shadow-lg shadow-primary/20 group"
              aria-label="Send message"
            >
              <Send className="size-5 transition-transform group-active:translate-x-1 group-active:-translate-y-1" />
            </Button>
          </div>
          <div className="flex justify-center gap-3 mt-3">
            <button className="text-[10px] bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-full border shadow-sm hover:border-primary/50 transition-colors font-medium">
              ✨ List compliance tasks
            </button>
            <button className="text-[10px] bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-full border shadow-sm hover:border-primary/50 transition-colors font-medium">
              📋 Extract all entities
            </button>
            <button className="text-[10px] bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-full border shadow-sm hover:border-primary/50 transition-colors font-medium">
              🔍 Find similar files
            </button>
          </div>
        </div>
      </main>

      {/* Decorative Blur Background elements */}
      <div className="absolute top-0 right-0 size-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 size-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
    </div>
  ),
};

// Re-using common components for internal icons
const Clock = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const AlertCircle = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
