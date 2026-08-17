import { Link } from "@tanstack/react-router";
import { ArrowUpRight, GitCompare } from "lucide-react";
import type { Submission } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { GemBadge, PriorityBadge, ScoreBar, TagBadge } from "./primitives";

export function SubmissionCard({
  submission: s,
  selected,
  onToggleCompare,
}: {
  submission: Submission;
  selected?: boolean;
  onToggleCompare?: (id: string) => void;
}) {
  return (
    <article
      className={cn(
        "card-surface flex flex-col gap-4 p-5 transition-all hover:shadow-lift",
        s.hiddenGem && "border-gem/35",
        selected && "ring-2 ring-ring",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold">{s.team}</h3>
            <span className="text-xs text-muted-foreground">{s.id}</span>
          </div>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">{s.project}</p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <TagBadge>{s.category}</TagBadge>
            <TagBadge>{s.problemArea}</TagBadge>
            {s.reviewed ? <TagBadge>Reviewed</TagBadge> : null}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <PriorityBadge priority={s.priority} />
          {s.hiddenGem ? <GemBadge /> : null}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ScoreBar
          label="Innovation Signal"
          value={s.scores.innovationSignal}
          hint="How differentiated this submission appears relative to the available submissions. Not a guarantee of innovation."
        />
        <ScoreBar label="Similarity" value={s.scores.similarity} invertTone hint="Peak similarity to the closest submission in the same problem area." />
        <ScoreBar label="Impact" value={s.scores.impact} />
        <ScoreBar label="Presentation Quality" value={s.scores.presentationQuality} />
      </div>

      <p className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">AI recommendation: </span>
        {s.recommendation}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2">
        <Button asChild size="sm">
          <Link to="/judge/submissions/$id" params={{ id: s.id }}>
            Open analysis <ArrowUpRight className="size-4" />
          </Link>
        </Button>
        {onToggleCompare ? (
          <Button variant="outline" size="sm" onClick={() => onToggleCompare(s.id)} aria-pressed={selected}>
            <GitCompare className="size-4" />
            {selected ? "Selected" : "Compare"}
          </Button>
        ) : null}
      </div>
    </article>
  );
}

export function CompareCheckbox({
  id,
  checked,
  onToggle,
  label,
}: {
  id: string;
  checked: boolean;
  onToggle: (id: string) => void;
  label: string;
}) {
  return (
    <Checkbox checked={checked} onCheckedChange={() => onToggle(id)} aria-label={`Select ${label} for comparison`} />
  );
}
