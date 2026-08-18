import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, AlertTriangle, Sparkles, Layers } from "lucide-react";
import type { Submission } from "@/lib/demo-data";
import { AiNote, AnalysisSkeleton, HumanDecidesNote, ScoreBar, SignalPill } from "./primitives";

export function AiAnalysisPanel({ submission: s, simulateLoading = true }: { submission: Submission; simulateLoading?: boolean }) {
  const [loading, setLoading] = useState(simulateLoading);
  useEffect(() => {
    if (!simulateLoading) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 850);
    return () => clearTimeout(t);
  }, [s.id, simulateLoading]);

  if (loading) return <AnalysisSkeleton label="Loading AI analysis for this submission…" />;

  return (
    <div className="space-y-4">
      <section className="card-surface p-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Sparkles className="size-4 text-primary-glow" /> AI summary
          </h2>
          <SignalPill value={s.scores.innovationSignal} />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.aiSummary}</p>
        <div className="mt-4">
          <AiNote />
        </div>
      </section>

      <section className="card-surface p-5">
        <h2 className="text-sm font-semibold">Why highlighted?</h2>
        <ul className="mt-3 space-y-2">
          {s.whyHighlighted.map((r) => (
            <li key={r} className="flex gap-2 text-sm">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-muted-foreground">{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="card-surface p-5">
        <h2 className="text-sm font-semibold">Innovation signals</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Innovation Signal indicates how differentiated this submission appears relative to the available submissions.
          It is not a guarantee of innovation.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ScoreBar label="Problem differentiation" value={s.scores.problemRelevance} />
          <ScoreBar label="Solution differentiation" value={s.scores.solutionDifferentiation} />
          <ScoreBar label="Technical differentiation" value={s.scores.technicalDifferentiation} />
          <ScoreBar label="Competition differentiation" value={100 - s.scores.similarity} />
          <ScoreBar label="Impact signal" value={s.scores.impact} />
          <ScoreBar label="Feasibility signal" value={s.scores.feasibility} />
          <ScoreBar label="Presentation quality" value={s.scores.presentationQuality} />
          <ScoreBar label="Similarity signal" value={s.scores.similarity} invertTone />
        </div>
      </section>

      <section className="card-surface p-5">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Layers className="size-4 text-primary" /> Similar submissions
        </h2>
        {s.similar.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            No similarity matches above threshold — this submission stands alone in its problem area.
          </p>
        ) : (
          <ul className="mt-3 space-y-3">
            {s.similar.map((sim) => (
              <li key={sim.id} className="rounded-xl border border-border p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Link
                    to="/judge/submissions/$id"
                    params={{ id: sim.id }}
                    className="text-sm font-semibold hover:text-primary hover:underline"
                  >
                    {sim.team} — {sim.project}
                  </Link>
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold tabular-nums">
                    {sim.similarity}% similar
                  </span>
                </div>
                <dl className="mt-2 grid gap-1 text-xs text-muted-foreground sm:grid-cols-2">
                  <div>
                    <dt className="inline font-semibold text-foreground">Common problem: </dt>
                    <dd className="inline">{sim.commonProblem}</dd>
                  </div>
                  <div>
                    <dt className="inline font-semibold text-foreground">Common approach: </dt>
                    <dd className="inline">{sim.commonApproach}</dd>
                  </div>
                </dl>
                <p className="mt-2 text-xs">
                  <span className="font-semibold">Key difference: </span>
                  <span className="text-muted-foreground">{sim.keyDifference}</span>
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        <section className="card-surface p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-success">
            <CheckCircle2 className="size-4" /> Strengths
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {s.strengths.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-success" />
                {x}
              </li>
            ))}
          </ul>
        </section>
        <section className="card-surface p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-warning-foreground">
            <AlertTriangle className="size-4" /> Concerns
          </h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {s.concerns.map((x) => (
              <li key={x} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" />
                {x}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <HumanDecidesNote />
    </div>
  );
}
