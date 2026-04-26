import type { Meta, StoryObj } from "@storybook/react";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import FileDown from "lucide-react/dist/esm/icons/file-down";
import Mail from "lucide-react/dist/esm/icons/mail";
import PieChart from "lucide-react/dist/esm/icons/pie-chart";
import User from "lucide-react/dist/esm/icons/user";
import Zap from "lucide-react/dist/esm/icons/zap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

const meta: Meta = {
  title: "MCP / Travel Agent Chat Simulation",
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

/**
 * # Travel Agent Workspace Simulation
 *
 * This example simulates how a **Travel Agent** interacts with the **VIAJES MCP Server**
 * to build high-end itineraries for their clients. It features professional tools for
 * budgeting, template selection, and proposal management.
 */
export const Simulation: StoryObj = {
  render: () => (
    <div className="flex h-screen bg-zinc-50 dark:bg-zinc-950 font-sans overflow-hidden">
      {/* Sidebar: Agent Activity & Context */}
      <aside className="w-80 border-r bg-white dark:bg-zinc-900 flex flex-col shrink-0 hidden lg:flex">
        <div className="p-6 border-b space-y-4">
          <div className="flex items-center gap-2">
            <div className="size-8 bg-zinc-800 rounded flex items-center justify-center text-white font-mono text-xs">
              V
            </div>
            <h2 className="font-bold text-sm">Agent Toolkit v2.4</h2>
          </div>

          {/* Active Client Card */}
          <div className="p-4 bg-primary/5 rounded-2xl border border-primary/20 space-y-3">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                <User className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-[12px] font-bold">Pelayo Casanova</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                  Client ID: PC-882
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg border text-center">
                <p className="text-[10px] text-muted-foreground">Budget</p>
                <p className="text-xs font-bold">$12,000</p>
              </div>
              <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg border text-center">
                <p className="text-[10px] text-muted-foreground">Group</p>
                <p className="text-xs font-bold">2 Pax</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div className="space-y-3">
            <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest px-2">
              Agent Metrics
            </h3>
            <div className="space-y-1">
              {[
                { label: "Proposals (Monthly)", value: "28/40", progress: 70 },
                { label: "Booking Rate", value: "84%", progress: 84 },
              ].map((m) => (
                <div key={m.label} className="p-2 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="text-[11px] font-medium">{m.label}</span>
                    <span className="text-[11px] font-bold">{m.value}</span>
                  </div>
                  <div className="h-1 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-zinc-50 dark:bg-zinc-800/20">
          <Button className="w-full h-11 gap-2 shadow-lg shadow-primary/20 font-bold text-sm">
            <Zap className="size-4" />
            New Quick Proposal
          </Button>
        </div>
      </aside>

      {/* Main Conversation Hub */}
      <main className="flex-1 flex flex-col relative bg-zinc-50 dark:bg-zinc-950">
        <header className="h-16 border-b bg-white dark:bg-zinc-900 flex items-center px-6 justify-between shrink-0 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-primary/5 text-primary border-primary/20 text-[10px] uppercase font-bold"
            >
              Draft
            </Badge>
            <h1 className="font-bold text-base">
              itinerary-ibiza-luxury-v1.json
            </h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-9 gap-2 text-xs">
              <FileDown className="size-4" />
              Export PDF
            </Button>
            <Button
              size="sm"
              className="h-9 gap-2 text-xs bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/20 border-none"
            >
              <Mail className="size-4 text-white" />
              Send to Client
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-10 max-w-4xl mx-auto w-full pb-44 scroll-smooth">
          {/* Agent Message */}
          <div className="flex justify-end ml-24 group">
            <div className="bg-zinc-800 text-white p-4 rounded-2xl rounded-tr-sm shadow-xl max-w-lg transition-transform group-hover:-translate-y-0.5">
              <p className="text-[13px] leading-relaxed font-medium">
                I'm preparing a proposal for Pelayo (PC-882). He wants a 4-day
                boutique experience in Ibiza for next week. Focus on luxury,
                gastronomy, and culture. Pulish the{" "}
                <code className="text-primary-foreground underline font-mono text-[11px]">
                  luxury_itinerary_v2
                </code>{" "}
                template.
              </p>
            </div>
          </div>

          {/* AI Response Hub */}
          <div className="flex gap-4">
            <div className="size-9 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
              <Zap className="size-5 text-white" />
            </div>
            <div className="space-y-6 flex-1 pt-1">
              <p className="text-[14px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                Understood, Elena. Analyzing client history and high-end
                inventory. I've customized the proposal using the{" "}
                <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded font-mono">
                  suggest_itinerary
                </code>{" "}
                and{" "}
                <code className="bg-zinc-200 dark:bg-zinc-800 px-1 rounded font-mono">
                  calculate_price_summary
                </code>{" "}
                tools.
              </p>

              {/* Tool Output: Budget Dashboard Preview */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-[11px] font-bold text-muted-foreground uppercase tracking-widest italic">
                  <PieChart className="size-4 text-primary animate-pulse" />
                  Executing{" "}
                  <span className="text-zinc-800 dark:text-white">
                    show_budget_dashboard
                  </span>
                  ...
                </div>

                <Card className="border-primary/20 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden">
                  <CardHeader className="p-5 border-b bg-primary/5">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-base">
                          Margin Analysis
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Estimated commission:{" "}
                          <span className="font-bold text-emerald-600 font-mono">
                            $1,240.00
                          </span>
                        </CardDescription>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                        Optimal Margin
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-muted-foreground">
                          FLIGHTS (PRIVATE)
                        </span>
                        <span className="font-bold">$4,200.00</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-muted-foreground">
                          BOUTIQUE HOTELS
                        </span>
                        <span className="font-bold">$6,100.00</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-muted-foreground">
                          VIP ACTIVITIES
                        </span>
                        <span className="font-bold">$1,700.00</span>
                      </div>
                      <div className="h-px bg-zinc-100 dark:bg-zinc-800 my-2" />
                      <div className="flex items-center justify-between font-bold text-sm tracking-tight">
                        <span>TOTAL COST</span>
                        <span className="text-primary text-base font-mono">
                          $12,000.00
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Itinerary Preview for the Agent */}
              <div className="space-y-4">
                <p className="text-[14px]">
                  I've structured the 4 days according to the "Vila" premium
                  module:
                </p>

                <Card className="shadow-lg border-zinc-200 dark:border-zinc-800">
                  <div className="divide-y">
                    {[
                      {
                        day: 1,
                        title: "VIP Pick-up & Gastronomy Intro",
                        price: "$1,200",
                      },
                      {
                        day: 2,
                        title: "Dalt Vila Private Tour",
                        price: "$850",
                      },
                      {
                        day: 3,
                        title: "Charter Yacht to Formentera",
                        price: "$3,400",
                      },
                      {
                        day: 4,
                        title: "Spa & Sunset Departure",
                        price: "$900",
                      },
                    ].map((d) => (
                      <div
                        key={d.day}
                        className="flex gap-4 p-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors group"
                      >
                        <div className="font-mono text-[10px] font-bold text-primary pt-1 w-12 shrink-0">
                          DAY 0{d.day}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold truncate">
                            {d.title}
                          </h4>
                        </div>
                        <span className="text-xs font-mono font-bold text-muted-foreground self-center">
                          {d.price}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <ChevronRight className="size-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>

                <p className="text-[13px] leading-relaxed italic text-muted-foreground">
                  Should I lock these prices and generate the proposal link for
                  the client?
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating AI Input area */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-30">
          <div className="bg-white dark:bg-zinc-900 border rounded-2xl p-2 shadow-2xl ring-1 ring-black/5 flex items-end gap-2 pr-4 transition-all focus-within:ring-primary/30">
            <div className="flex-1 pb-1 pl-3">
              <input
                type="text"
                placeholder="Lock prices and draft final proposal..."
                className="w-full bg-transparent border-none focus:outline-none text-sm h-11"
                readOnly
              />
            </div>
            <Button
              size="icon"
              className="size-10 rounded-xl mb-1 shadow-lg shadow-primary/20 group"
              aria-label="Confirm action"
            >
              <CheckCircle2 className="size-5 transition-transform group-active:scale-95" />
            </Button>
          </div>
          <div className="flex justify-center gap-2 mt-4">
            <button className="text-[10px] bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-3 py-1.5 rounded-lg shadow-lg font-bold flex items-center gap-1.5 transition-transform hover:-translate-y-0.5">
              <FileDown className="size-3" />
              DRAFT PROPOSAL PDF
            </button>
            <button className="text-[10px] bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg border shadow-sm hover:border-primary/50 transition-colors font-bold uppercase tracking-wider">
              Modify Flight
            </button>
            <button className="text-[10px] bg-white dark:bg-zinc-800 px-3 py-1.5 rounded-lg border shadow-sm hover:border-primary/50 transition-colors font-bold uppercase tracking-wider">
              Add Activity
            </button>
          </div>
        </div>
      </main>

      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 size-[500px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 size-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -z-10" />
    </div>
  ),
};

const CheckCircle2 = ({ className }: { className?: string }) => (
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
    <path d="m9 12 2 2 4-4" />
  </svg>
);
