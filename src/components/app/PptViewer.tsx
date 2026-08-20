import { useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, FileText, Sparkles, Upload, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SLIDES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import { AiNote } from "./primitives";
import type { ReactNode } from "react";

export interface UploadedDeck {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

/** Session store so uploaded decks survive dialog close/reopen per team. */
const uploadStore = new Map<string, UploadedDeck[]>();

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function PptViewer({ team, trigger }: { team: string; trigger: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [uploads, setUploads] = useState<UploadedDeck[]>(() => uploadStore.get(team) ?? []);
  const [activeUpload, setActiveUpload] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const slide = SLIDES[index]!;

  const active = useMemo(() => uploads.find((u) => u.id === activeUpload) ?? null, [uploads, activeUpload]);

  const persist = (next: UploadedDeck[]) => {
    uploadStore.set(team, next);
    setUploads(next);
  };

  const onFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const added: UploadedDeck[] = Array.from(files).map((file) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: file.name,
      type: file.type || "application/octet-stream",
      size: file.size,
      url: URL.createObjectURL(file),
    }));
    const next = [...uploads, ...added];
    persist(next);
    setActiveUpload(added[0]!.id);
    if (inputRef.current) inputRef.current.value = "";
  };

  const removeUpload = (id: string) => {
    const target = uploads.find((u) => u.id === id);
    if (target) URL.revokeObjectURL(target.url);
    const next = uploads.filter((u) => u.id !== id);
    persist(next);
    if (activeUpload === id) setActiveUpload(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-6xl overflow-y-auto p-0">
        <div className="border-b border-border px-5 py-4">
          <DialogTitle className="flex items-center gap-2 text-base">
            <FileText className="size-4 text-primary" /> {team} — submission deck
          </DialogTitle>
          <DialogDescription className="text-xs">
            Upload the real submission file (PDF or images) to review it here, or browse the sample slide previews. AI
            insights are aligned to the visible slide.
          </DialogDescription>
        </div>
        <div className="grid gap-0 lg:grid-cols-[210px_1fr_290px]">
          <div className="border-b border-border p-3 lg:h-[460px] lg:overflow-y-auto lg:border-b-0 lg:border-r">
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,image/*"
              multiple
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
            <Button variant="outline" size="sm" className="w-full" onClick={() => inputRef.current?.click()}>
              <Upload className="size-4" /> Upload deck
            </Button>

            {uploads.length > 0 ? (
              <ul className="mt-3 space-y-2">
                {uploads.map((u) => (
                  <li key={u.id} className="flex items-start gap-1">
                    <button
                      onClick={() => setActiveUpload(u.id)}
                      aria-current={activeUpload === u.id ? "true" : undefined}
                      className={cn(
                        "flex-1 rounded-lg border p-2 text-left text-[11px] transition-colors",
                        activeUpload === u.id ? "border-primary bg-accent" : "border-border hover:bg-secondary",
                      )}
                    >
                      <span className="block truncate font-medium">{u.name}</span>
                      <span className="text-muted-foreground">{formatSize(u.size)}</span>
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7"
                      aria-label={`Remove ${u.name}`}
                      onClick={() => removeUpload(u.id)}
                    >
                      <Trash2 className="size-3.5" />
                    </Button>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-3 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Sample slides
            </p>
            <ol className="mt-2 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
              {SLIDES.map((s, i) => (
                <li key={s.title} className="shrink-0 lg:shrink">
                  <button
                    onClick={() => {
                      setIndex(i);
                      setActiveUpload(null);
                    }}
                    aria-current={!active && i === index ? "true" : undefined}
                    className={cn(
                      "w-36 rounded-lg border p-2 text-left text-[11px] transition-colors lg:w-full",
                      !active && i === index ? "border-primary bg-accent" : "border-border hover:bg-secondary",
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
          </div>

          <div className="flex flex-col p-5">
            {active ? (
              <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-soft">
                {active.type.startsWith("image/") ? (
                  <img src={active.url} alt={`${team} uploaded deck page`} className="h-[420px] w-full object-contain" />
                ) : active.type === "application/pdf" ? (
                  <iframe src={active.url} title={`${active.name} preview`} className="h-[420px] w-full" />
                ) : (
                  <div className="flex h-[420px] flex-col items-center justify-center gap-3 p-6 text-center">
                    <FileText className="size-8 text-primary" />
                    <p className="text-sm text-muted-foreground">
                      Inline preview isn't available for this file type. Open it in a new tab instead.
                    </p>
                    <Button asChild size="sm" variant="outline">
                      <a href={active.url} target="_blank" rel="noreferrer">
                        Open {active.name}
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ) : (
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
            )}
            <div className="mt-4 flex items-center justify-between gap-2">
              {active ? (
                <>
                  <p className="text-xs text-muted-foreground">
                    Viewing uploaded file · {active.name} ({formatSize(active.size)})
                  </p>
                  <Button variant="outline" size="sm" onClick={() => setActiveUpload(null)}>
                    Back to sample slides
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIndex((i) => Math.max(0, i - 1))}
                    disabled={index === 0}
                  >
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
                </>
              )}
            </div>
          </div>

          <aside className="space-y-3 border-t border-border bg-secondary/40 p-5 lg:border-l lg:border-t-0">
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-4 text-primary-glow" /> AI insights on this slide
            </p>
            <div
              className={cn(
                "rounded-lg border p-3 text-sm",
                active
                  ? "border-border bg-card"
                  : slide.tone === "positive"
                    ? "border-success/30 bg-success/10"
                    : slide.tone === "warning"
                      ? "border-warning/40 bg-warning/12"
                      : "border-destructive/30 bg-destructive/10",
              )}
            >
              {active
                ? "Uploaded deck loaded for manual review. Slide-level AI insights below reflect the analyzed submission summary."
                : slide.insight}
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
