import type { ReactNode } from "react";
import { Info, Sparkles, ShieldCheck, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip as TooltipRoot,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/** Self-contained tooltip so any card can be rendered without an ancestor provider. */
function Tooltip({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <TooltipRoot>{children}</TooltipRoot>
    </TooltipProvider>
  );
}
import { Skeleton } from "@/components/ui/skeleton";
import type { Priority, Saturation } from "@/lib/demo-data";

export function SectionHeading({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? <p className="mt-1 max-w-3xl text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "default",
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
  tone?: "default" | "gem" | "warning" | "success" | "brand";
}) {
  const toneClass = {
    default: "text-foreground",
    gem: "text-gem",
    warning: "text-warning",
    success: "text-success",
    brand: "text-primary",
  }[tone];
  return (
    <div className="card-surface group p-4 transition-all hover:shadow-lift sm:p-5">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {icon ? <span className={cn("opacity-70", toneClass)}>{icon}</span> : null}
      </div>
      <p className={cn("mt-2 text-3xl font-semibold tabular-nums", toneClass)}>{value}</p>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

const scoreTone = (v: number) =>
  v >= 78 ? "bg-success" : v >= 60 ? "bg-primary-glow" : v >= 45 ? "bg-warning" : "bg-destructive";

export function ScoreBar({
  label,
  value,
  hint,
  invertTone = false,
}: {
  label: string;
  value: number;
  hint?: string;
  invertTone?: boolean;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 text-sm">
        <span className="flex items-center gap-1.5 font-medium">
          {label}
          {hint ? (
            <Tooltip>
              <TooltipTrigger aria-label={`About ${label}`} className="text-muted-foreground">
                <Info className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">{hint}</TooltipContent>
            </Tooltip>
          ) : null}
        </span>
        <span className="font-semibold tabular-nums">{value}</span>
      </div>
      <div
        className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <div
          className={cn("h-full rounded-full transition-all duration-500", invertTone ? "bg-chart-7" : scoreTone(value))}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function SignalPill({ value, label = "Innovation Signal" }: { value: number; label?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-semibold tabular-nums">
          <Sparkles className="size-3.5 text-primary-glow" />
          {label} {value}
        </span>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">
        Innovation Signal indicates how differentiated this submission appears relative to the available submissions. It
        is not a guarantee of innovation.
      </TooltipContent>
    </Tooltip>
  );
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const map: Record<Priority, string> = {
    "High Priority": "border-destructive/30 bg-destructive/10 text-destructive",
    Review: "border-warning/40 bg-warning/15 text-warning-foreground",
    Standard: "border-border bg-secondary text-secondary-foreground",
  };
  return (
    <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-semibold", map[priority])}>{priority}</span>
  );
}

export function GemBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-gem/40 bg-gem/12 px-2.5 py-1 text-[11px] font-semibold text-gem",
        className,
      )}
    >
      ⭐ Potential Hidden Gem
    </span>
  );
}

export function SaturationBadge({ saturation }: { saturation: Saturation }) {
  const map: Record<Saturation, string> = {
    "Highly Saturated": "border-destructive/30 bg-destructive/10 text-destructive",
    Medium: "border-warning/40 bg-warning/15 text-warning-foreground",
    Underexplored: "border-success/40 bg-success/12 text-success",
  };
  return (
    <span className={cn("rounded-full border px-2.5 py-1 text-[11px] font-semibold", map[saturation])}>
      {saturation}
      {saturation === "Underexplored" ? " — Human Review Recommended" : ""}
    </span>
  );
}

export function AiNote({ children }: { children?: ReactNode }) {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-border bg-muted/60 px-3 py-2 text-xs text-muted-foreground">
      <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-primary" />
      <span>{children ?? "AI-generated insight. Verify against the original submission."}</span>
    </p>
  );
}

export function HumanDecidesNote() {
  return (
    <p className="flex items-start gap-2 rounded-lg border border-primary/20 bg-accent px-3 py-2 text-xs text-accent-foreground">
      <AlertTriangle className="mt-0.5 size-3.5 shrink-0" />
      <span>AI recommendation is advisory. Final decision belongs to the judge.</span>
    </p>
  );
}

export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="card-surface flex flex-col items-center justify-center gap-2 px-6 py-14 text-center">
      <span className="mb-1 flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
        {icon ?? <Info className="size-5" />}
      </span>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}

export function AnalysisSkeleton({ label = "Running AI analysis…" }: { label?: string }) {
  return (
    <div className="card-surface space-y-3 p-5" aria-busy="true" aria-live="polite">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Sparkles className="size-4 animate-pulse text-primary-glow" />
        {label}
      </div>
      <Skeleton className="h-3 w-4/5" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-2/3" />
      <div className="grid gap-3 pt-2 sm:grid-cols-2">
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
        <Skeleton className="h-12" />
      </div>
    </div>
  );
}

export function TagBadge({ children }: { children: ReactNode }) {
  return (
    <Badge variant="secondary" className="rounded-full font-medium">
      {children}
    </Badge>
  );
}
