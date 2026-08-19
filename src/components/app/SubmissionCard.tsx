import { Link } from "@tanstack/react-router";
import { ArrowUpRight, GitCompare, Sparkles } from "lucide-react";
import type { Submission } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { GemBadge, PriorityBadge, ScoreBar, TagBadge } from "./primitives";
import { AiRecommendationTag, gemEvidence, isPotentialGem } from "./GemEvidence";
import { useDecisions } from "@/lib/decision-store";

export function SubmissionCard({
  submission: s,
  selected,
  onToggleCompare,
}: {
  submission: Submission;
  selected?: boolean;
  onToggleCompare?: (id: string) => void;
}) {
  const { decisions } = useDecisions();
  const decision = decisions[s.id]?.decision;
  const gem = isPotentialGem(s);

  return (
    <article
      className={cn(
        "card-surface flex flex-col gap-4 p-5 transition-all hover:shadow-lift",
        gem && "border-gem/35",
        selected && "ring-2 ring-ring",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-semibold">{s.project}</h3>
            <span className="text-xs text-muted-foreground">{s.id}</span>
          </div>
          <p className="mt-0.5 truncate text-sm text-muted-foreground">
            {s.team} · {s.college}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <TagBadge>{s.category}</TagBadge>
            <TagBadge>{s.problemArea}</TagBadge>
            {s.reviewed ? <TagBadge>Reviewed</TagBadge> : null}
            {decision ? (
              <span
                className={cn(
                  "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                  decision === "shortlisted"
                    ? "border-success/40 bg-success/12 text-success"
                    : "border-destructive/40 bg-destructive/12 text-destructive",
                )}
              >
                {decision === "shortlisted" ? "Shortlisted" : "Rejected"}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <PriorityBadge priority={s.priority} />
          {gem ? <GemBadge /> : null}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <ScoreBar
          label="Innovation Score"
          value={s.scores.innovationSignal}
          hint="How differentiated this submission appears relative to the available submissions. Not a guarantee of innovation."
        />
        <ScoreBar label="Impact Score" value={s.scores.impact} />
        <ScoreBar label="Presentation Score" value={s.scores.presentationQuality} />
        <ScoreBar
          label="Similarity Score"
          value={s.scores.similarity}
          invertTone
          hint="Peak similarity to the closest submission in the same problem area."
        />
      </div>

      {gem ? (
        <div className="rounded-xl border border-gem/35 bg-gem/10 p-3">
          <p className="text-xs font-semibold">Why AI flagged this as a Potential Hidden Gem</p>
          <ul className="mt-1.5 space-y-1">
            {gemEvidence(s)
              .slice(0, 2)
              .map((e) => (
                <li key={e} className="flex gap-2 text-[11px] leading-relaxed text-muted-foreground">
                  <Sparkles className="mt-0.5 size-3 shrink-0 text-gem" />
                  {e}
                </li>
              ))}
          </ul>
        </div>
      ) : null}

      <p className="rounded-lg border border-border bg-muted/50 px-3 py-2 text-xs text-muted-foreground">
        <span className="font-semibold text-foreground">AI recommendation: </span>
        {s.recommendation}
      </p>

      <div className="mt-auto space-y-3">
        <AiRecommendationTag />
        <div className="flex flex-wrap items-center gap-2">
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
