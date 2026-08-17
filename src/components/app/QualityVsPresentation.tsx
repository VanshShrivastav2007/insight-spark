import type { Submission } from "@/lib/demo-data";
import { ScoreBar } from "./primitives";

export function QualityVsPresentation({ submission: s }: { submission: Submission }) {
  const project = Math.round(
    (s.scores.problemRelevance +
      s.scores.innovationSignal +
      s.scores.solutionDifferentiation +
      s.scores.impact +
      s.scores.feasibility) /
      5,
  );
  const presentation = s.scores.presentationQuality;
  const overlooked = project - presentation >= 20;

  return (
    <section className="card-surface overflow-hidden">
      <div className="border-b border-border bg-secondary/60 px-5 py-3">
        <h3 className="text-sm font-semibold">Project quality vs presentation quality</h3>
        <p className="text-xs text-muted-foreground">
          The gap between what a team built and how well they explained it.
        </p>
      </div>
      <div className="grid gap-6 p-5 md:grid-cols-2">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Project quality</p>
          <ScoreBar label="Problem Relevance" value={s.scores.problemRelevance} />
          <ScoreBar label="Innovation Signal" value={s.scores.innovationSignal} />
          <ScoreBar label="Differentiation" value={s.scores.solutionDifferentiation} />
          <ScoreBar label="Impact" value={s.scores.impact} />
          <ScoreBar label="Feasibility" value={s.scores.feasibility} />
        </div>
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Presentation quality</p>
          <ScoreBar label="Clarity" value={s.scores.clarity} />
          <ScoreBar label="Structure" value={s.scores.structure} />
          <ScoreBar label="Visual Quality" value={s.scores.visualQuality} />
          <div className="mt-6 rounded-xl border border-border bg-muted/50 p-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Project signals</p>
                <p className="text-2xl font-semibold tabular-nums text-success">{project}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Presentation signals</p>
                <p className="text-2xl font-semibold tabular-nums text-chart-7">{presentation}</p>
              </div>
            </div>
            <p className="mt-3 text-sm font-medium">
              {overlooked
                ? "Strong Project Signals + Weak Presentation Signals"
                : presentation - project >= 20
                  ? "Strong Presentation Signals + Average Project Signals"
                  : "Project and presentation signals are broadly aligned"}
            </p>
            {overlooked ? (
              <span className="mt-2 inline-flex rounded-full border border-gem/40 bg-gem/12 px-2.5 py-1 text-[11px] font-semibold text-gem">
                Potentially Overlooked
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
