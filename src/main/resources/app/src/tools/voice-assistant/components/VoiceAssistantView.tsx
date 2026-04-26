import React, { useRef, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";

interface VoiceAssistantViewProps {
  isStreaming: boolean;
  status: string;
  subStatus: string;
  history: string[];
  isBusy: boolean;
  onToggleStreaming: () => void;
  analyzer: AnalyserNode | null;
}

export const VoiceAssistantView: React.FC<VoiceAssistantViewProps> = ({
  isStreaming,
  status,
  subStatus,
  history,
  isBusy,
  onToggleStreaming,
  analyzer
}) => {
  const visualizerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let animationId: number;
    const updateVisualizer = () => {
      if (!analyzer || !visualizerRef.current) return;
      const dataArray = new Uint8Array(analyzer.frequencyBinCount);
      analyzer.getByteFrequencyData(dataArray);

      const bars = visualizerRef.current.children;
      const step = Math.floor(dataArray.length / bars.length);
      for (let i = 0; i < bars.length; i++) {
        const val = dataArray[i * step] / 128.0;
        const height = Math.max(8, val * 60);
        (bars[i] as HTMLElement).style.height = `${height}px`;
      }
      animationId = requestAnimationFrame(updateVisualizer);
    };

    if (isStreaming) {
      updateVisualizer();
    }
    return () => cancelAnimationFrame(animationId);
  }, [isStreaming, analyzer]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] w-full p-4 space-y-6">
      <Card className="w-full max-w-md bg-card/50 backdrop-blur-md border-primary/20 shadow-xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-br from-primary to-primary-foreground bg-clip-text text-transparent">
            Marvin Assistant
          </CardTitle>
          <div className="flex flex-col items-center space-y-1">
            <Badge variant={isStreaming ? "destructive" : "secondary"} className="animate-in fade-in">
              {status}
            </Badge>
            <p className="text-xs text-muted-foreground italic">{subStatus}</p>
          </div>
        </CardHeader>
        
        <CardContent className="flex flex-col items-center space-y-8 pt-6">
          <div ref={visualizerRef} className="flex items-center gap-1.5 h-16">
            {Array.from({ length: 24 }).map((_, i) => (
              <div
                key={i}
                className="w-1.5 bg-primary/80 rounded-full transition-all duration-75"
                style={{ height: "8px" }}
              />
            ))}
          </div>

          <Button
            size="lg"
            variant={isStreaming ? "destructive" : "default"}
            disabled={isBusy}
            onClick={onToggleStreaming}
            className={`w-24 h-24 rounded-full shadow-lg transition-all duration-500 hover:scale-110 active:scale-95 ${
              isStreaming ? "ring-4 ring-destructive/30" : ""
            }`}
          >
            {isStreaming ? (
              <Mic className="w-10 h-10 animate-pulse" />
            ) : (
              <MicOff className="w-10 h-10" />
            )}
          </Button>

          <div className="w-full space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <Volume2 className="w-3.5 h-3.5" />
              Conversación
            </div>
            <div className="bg-muted/30 rounded-xl p-4 h-48 overflow-hidden relative">
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-muted/30 to-transparent z-10" />
              <div className="space-y-3 h-full overflow-y-auto pr-2 scrollbar-thin">
                {history.map((text, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-background/50 border border-border/50 text-sm shadow-sm animate-in slide-in-from-left-2 fade-in">
                    {text}
                  </div>
                ))}
                {history.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-xs text-muted-foreground/60 space-y-2">
                    <p>Esperando interacción...</p>
                  </div>
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-muted/30 to-transparent z-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-normal">
          Backend: Spring Boot
        </Badge>
        <Badge variant="outline" className="bg-secondary/5 text-secondary border-secondary/20 font-normal">
          VAD: Server-side
        </Badge>
      </div>
    </div>
  );
};
