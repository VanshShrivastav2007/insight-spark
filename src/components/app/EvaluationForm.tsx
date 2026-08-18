import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";
import type { Submission } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { averageOf, useEvaluations, type Evaluation } from "@/lib/eval-store";

const CRITERIA = [
  { key: "problemRelevance", label: "Problem Relevance" },
  { key: "innovation", label: "Innovation" },
  { key: "impact", label: "Impact" },
  { key: "feasibility", label: "Feasibility" },
  { key: "prototype", label: "Prototype" },
  { key: "presentation", label: "Presentation" },
] as const;

type Key = (typeof CRITERIA)[number]["key"];

export function EvaluationForm({ submission }: { submission: Submission }) {
  const { evaluations, save } = useEvaluations();
  const existing = evaluations[submission.id];
  const [values, setValues] = useState<Record<Key, number>>({
    problemRelevance: 7,
    innovation: 7,
    impact: 7,
    feasibility: 7,
    prototype: 7,
    presentation: 5,
  });
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState<"draft" | "submitted" | null>(null);

  useEffect(() => {
    if (!existing) return;
    setValues({
      problemRelevance: existing.problemRelevance,
      innovation: existing.innovation,
      impact: existing.impact,
      feasibility: existing.feasibility,
      prototype: existing.prototype,
      presentation: existing.presentation,
    });
    setComments(existing.comments);
    setStatus(existing.status);
  }, [existing?.submissionId]);

  const persist = (next: "draft" | "submitted") => {
    const evaluation: Evaluation = {
      submissionId: submission.id,
      team: submission.team,
      ...values,
      comments,
      status: next,
      updatedAt: new Date().toISOString(),
    };
    save(evaluation);
    setStatus(next);
    toast.success(next === "draft" ? "Draft saved" : "Evaluation submitted", {
      description:
        next === "draft"
          ? `Your scores for ${submission.team} are saved locally and can be edited.`
          : `Human evaluation recorded for ${submission.team}. Average ${averageOf(evaluation)}/10. AI signals remain separate.`,
    });
  };

  const average = (Object.values(values).reduce((a, b) => a + b, 0) / 6).toFixed(1);

  return (
    <section className="card-surface p-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Judge evaluation</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Human scores are recorded separately from AI signals and never overwritten by them.
          </p>
        </div>
        {status ? (
          <span className="rounded-full border border-success/40 bg-success/12 px-2.5 py-1 text-[11px] font-semibold text-success">
            {status === "draft" ? "Draft saved" : "Submitted"}
          </span>
        ) : null}
      </div>

      <div className="mt-4 space-y-4">
        {CRITERIA.map((c) => (
          <div key={c.key}>
            <div className="flex items-baseline justify-between text-sm">
              <label htmlFor={`crit-${c.key}`} className="font-medium">
                {c.label}
              </label>
              <span className="font-semibold tabular-nums">{values[c.key]}/10</span>
            </div>
            <Slider
              id={`crit-${c.key}`}
              className="mt-2"
              value={[values[c.key]]}
              min={0}
              max={10}
              step={1}
              onValueChange={([v]) => setValues((p) => ({ ...p, [c.key]: v ?? 0 }))}
              aria-label={c.label}
            />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <label htmlFor="eval-comments" className="text-sm font-medium">
          Comments
        </label>
        <Textarea
          id="eval-comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows={4}
          placeholder="What convinced you, and what still needs verification?"
          className="mt-2"
        />
      </div>

      <div className="mt-4 flex items-center justify-between rounded-xl border border-border bg-muted/50 p-3">
        <span className="text-xs text-muted-foreground">Your average (human score)</span>
        <span className="text-xl font-semibold tabular-nums">{average}/10</span>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button onClick={() => persist("submitted")}>
          <CheckCircle2 className="size-4" /> Submit evaluation
        </Button>
        <Button variant="outline" onClick={() => persist("draft")}>
          Save draft
        </Button>
      </div>
      <p className="mt-3 text-[11px] text-muted-foreground">
        AI Innovation Signal ({submission.scores.innovationSignal}) is shown alongside your score for context only. It
        does not contribute to the final score.
      </p>
    </section>
  );
}
