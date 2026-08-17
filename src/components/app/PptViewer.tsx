import { useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SLIDES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { AiNote } from "./primitives";
import type { ReactNode } from "react";

export function PptViewer({ team, trigger }: { team: string; trigger: ReactNode }) {
  const [index, setIndex] = useState(0);
  const slide = SLIDES[index]!;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-6xl overflow-y-auto p-0">
        <div className="border-b border-border px-5 py-4">
          <DialogTitle className="flex items-center gap-2 text-base">
            <FileText className="size-4 text-primary" /> {team} — original submission deck
          </DialogTitle>
          <DialogDescription className="text-xs">
            Simulated viewer with sample slide previews. AI insights are aligned to the visible slide.
          </DialogDescription>
        </div>
        <div className="grid gap-0 lg:grid-cols-[170px_1fr_290px]">
          <ol className="flex gap-2 overflow-x-auto border-b border-border p-3 lg:h-[460px] lg:flex-col lg:overflow-y-auto lg:border-b-0 lg:border-r">
            {SLIDES.map((s, i) => (
              <li key={s.title} className="shrink-0 lg:shrink">
                <button
                  onClick={() => setIndex(i)}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "w-36 rounded-lg border p-2 text-left text-[11px] transition-colors lg:w-full",
                    i === index ? "border-primary bg-accent" : "border-border hover:bg-secondary",
                  )}
                >
                  <span className="block aspect-video rounded bg-brand-gradient opacity-80" />
                  <span className="mt-1.5 block font-medium">
                    {i + 1}. {s.title}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="flex flex-col p-5">
            <div className="flex flex-1 flex-col justify-center rounded-xl border border-border bg-card p-6 shadow-soft">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                Slide {index + 1} of {SLIDES.length}
              </p>
              <h3 className="mt-2 text-2xl font-semibold">{slide.title}</h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{slide.body}</p>
              <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden="true">
                <span className="h-16 rounded-lg bg-secondary" />
                <span className="h-16 rounded-lg bg-secondary" />
                <span className="h-16 rounded-lg bg-secondary" />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-2">
              <Button variant="outline" size="sm" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={index === 0}>
                <ChevronLeft className="size-4" /> Previous slide
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIndex((i) => Math.min(SLIDES.length - 1, i + 1))}
                disabled={index === SLIDES.length - 1}
              >
                Next slide <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>

          <aside className="space-y-3 border-t border-border bg-secondary/40 p-5 lg:border-l lg:border-t-0">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary-glow" /> AI insights on this slide
            </p>
            <div
              className={cn(
                "rounded-lg border p-3 text-sm",
                slide.tone === "positive"
                  ? "border-success/30 bg-success/10"
                  : slide.tone === "warning"
                    ? "border-warning/40 bg-warning/12"
                    : "border-destructive/30 bg-destructive/10",
              )}
            >
              {slide.insight}
            </div>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">Problem: </span>Post-flood crop salvage decisions in
                river-basin districts.
              </li>
              <li>
                <span className="font-semibold text-foreground">Solution: </span>Radar-derived waterlogging duration to
                a replanting plan.
              </li>
              <li>
                <span className="font-semibold text-foreground">Differentiation: </span>Not leaf-image classification —
                different input data and decision output.
              </li>
              <li>
                <span className="font-semibold text-foreground">Possible concerns: </span>Small validation set; core
                method buried in dense text.
              </li>
            </ul>
            <AiNote />
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
