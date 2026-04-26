import type { Meta, StoryObj } from "@storybook/react";
import Clock from "lucide-react/dist/esm/icons/clock";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";
import FileText from "lucide-react/dist/esm/icons/file-text";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import MoreHorizontal from "lucide-react/dist/esm/icons/more-horizontal";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Terminal from "lucide-react/dist/esm/icons/terminal";
import Zap from "lucide-react/dist/esm/icons/zap";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";

const meta: Meta = {
  title: "MCP / In-Chat Blobs Showcase",
  parameters: {
    layout: "centered",
  },
};

export default meta;

/**
 * # In-Chat Blobs Gallery
 *
 * These components are designed to be rendered within a chat message stream.
 * They represent MCP tool outputs, statuses, and actionable widgets.
 */
export const Showcase: StoryObj = {
  render: () => (
    <div className="space-y-12 max-w-sm w-full py-12">
      {/* 1. Tool Call Running Blob */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          1. Tool Execution (Running)
        </h4>
        <div className="bg-zinc-100 dark:bg-zinc-800/50 p-3 rounded-2xl rounded-tl-none border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
            <Loader2 className="size-4 text-primary animate-spin" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold leading-none">
              Searching database...
            </p>
            <p className="text-[10px] text-muted-foreground font-mono mt-1">
              pg_server.query_vectors
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-[8px] h-4 bg-white dark:bg-zinc-950"
          >
            ASYNC
          </Badge>
        </div>
      </section>

      {/* 2. Compact Booking / Appointment Blob */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          2. Actionable Booking
        </h4>
        <Card className="bg-white dark:bg-zinc-900 border-primary/20 shadow-xl rounded-2xl rounded-tl-none overflow-hidden hover:ring-2 ring-primary/10 transition-all">
          <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between border-b bg-primary/5">
            <CardTitle className="text-xs font-bold flex items-center gap-2">
              <Clock className="size-3.5 text-primary" />
              Confirm Appointment
            </CardTitle>
            <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-[9px] h-4">
              Available
            </Badge>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase">
                  Monday, Oct 14
                </p>
                <p className="text-sm font-black">14:30 — 15:30</p>
              </div>
              <Badge variant="secondary" className="text-[10px]">
                60 min
              </Badge>
            </div>
            <Button className="w-full h-8 text-[11px] font-bold shadow-lg shadow-primary/20">
              CONFIRM SLOT
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* 3. Pricing & Money Blob */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          3. Pricing Quote
        </h4>
        <div className="bg-zinc-900 text-white p-4 rounded-2xl rounded-tl-none space-y-3 shadow-2xl relative overflow-hidden group transition-transform hover:-translate-y-1">
          <div className="flex justify-between items-start">
            <div className="space-y-0.5">
              <p className="text-[10px] opacity-60 uppercase font-black tracking-widest">
                Estimated Total
              </p>
              <p className="text-2xl font-black tabular-nums">$1,450.00</p>
            </div>
            <div className="p-2 bg-white/10 rounded-lg">
              <CreditCard className="size-4" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <Badge className="bg-white/10 text-[9px] h-4 border-none text-white whitespace-nowrap">
              Incl. Taxes
            </Badge>
            <Badge className="bg-white/10 text-[9px] h-4 border-none text-white whitespace-nowrap">
              Agent Fee $0
            </Badge>
            <Badge className="bg-emerald-500 text-[9px] h-4 border-none text-white whitespace-nowrap">
              Best Match
            </Badge>
          </div>
          <div className="absolute top-0 right-0 size-24 bg-primary/20 rounded-full blur-[40px] -z-10 group-hover:bg-primary/40 transition-colors" />
        </div>
      </section>

      {/* 4. Entity Extraction Tags Blob */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          4. Entity Extraction
        </h4>
        <div className="border border-dashed border-zinc-300 dark:border-zinc-700 p-4 rounded-2xl rounded-tl-none bg-zinc-50 dark:bg-zinc-800/20 space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-zinc-800 dark:bg-zinc-100 rounded text-white dark:text-zinc-900">
              <Terminal className="size-3" />
            </div>
            <p className="text-[11px] font-bold">nlp_engine results</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "#legal-contract",
              "#due-date-2025",
              "#high-severity",
              "#auth-required",
            ].map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold text-primary px-2 py-0.5 bg-primary/10 rounded-full border border-primary/10"
              >
                {tag}
              </span>
            ))}
            <button className="text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors">
              + View All
            </button>
          </div>
        </div>
      </section>

      {/* 5. Minimal File Status Blob */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          5. File Context Info
        </h4>
        <div className="group flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 border rounded-2xl rounded-tl-none shadow-sm hover:border-primary/40 transition-all cursor-pointer">
          <div className="size-10 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20 text-rose-500">
            <FileText className="size-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold truncate">Contract_v2_FINAL.pdf</p>
            <p className="text-[10px] text-muted-foreground">
              4.2 MB • Verified Oct 1
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </div>
      </section>

      {/* 6. Professional Protection Alert */}
      <section className="space-y-3">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          6. Support / Shield
        </h4>
        <div className="bg-emerald-500 text-white p-3 rounded-2xl rounded-tl-none flex items-center gap-4 shadow-lg shadow-emerald-500/20">
          <div className="size-9 bg-white/20 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck className="size-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold leading-tight">
              Elite Coverage Active
            </p>
            <p className="text-[9px] opacity-80 mt-0.5">
              Contact agent via Priority WhatsApp at any time.
            </p>
          </div>
          <Zap className="size-4 text-emerald-300 animate-pulse" />
        </div>
      </section>
    </div>
  ),
};
