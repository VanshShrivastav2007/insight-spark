import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardList, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { AiNote, EmptyState, HumanDecidesNote, SectionHeading, StatCard } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { listEvaluations, type StoredEvaluation } from "@/lib/eval-store";
import { getSubmission, STATS } from "@/lib/demo-data";

export const Route = createFileRoute("/judge/evaluations")({
  head: () => ({
    meta: [
      { title: "My Evaluations — HackSort AI" },
      {
        name: "description",
        content:
          "Human evaluations recorded by this judge, stored separately from AI innovation signals so the two are never mixed.",
      },
      { property: "og:title", content: "My Evaluations — HackSort AI" },
      {
        property: "og:description",
        content: "Your recorded scores and notes, kept independent from AI signals.",
      },
    ],
  }),
  component: EvaluationsPage,
});

function EvaluationsPage() {
  const [evals, setEvals] = useState<StoredEvaluation[]>([]);
  useEffect(() => {
    setEvals(listEvaluations());
  }, []);

  const avg = evals.length
    ? Math.round(evals.reduce((a, e) => a + e.total, 0) / evals.length)
    : 0;

  return (
    <AppShell role="judge">
      <SectionHeading
        title="My Evaluations"
        subtitle="Your scores and notes. HackSort AI never writes into this record — AI signals stay on the analysis panel."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Evaluations submitted" value={evals.length} icon={<ClipboardList className="size-4" />} />
        <StatCard label="Average human total" value={avg} tone="success" hint="Out of 100" />
        <StatCard label="Assigned submissions" value={STATS.total} hint={`${STATS.reviewed} reviewed in this demo`} />
      </div>

      <div className="mt-4">
        {evals.length === 0 ? (
          <EmptyState
            icon={<ClipboardList className="size-5" />}
            title="No evaluations recorded yet"
            description="Open a submission, read the AI analysis and record your own scores. Your evaluation is stored on this device and remains separate from AI signals."
            action={
              <Button asChild>
                <Link to="/judge/queue">
                  Go to priority queue <ArrowRight className="size-4" />
                </Link>
              </Button>
            }
          />
        ) : (
          <section className="card-surface p-5">
            <ul className="space-y-2">
              {evals.map((e) => {
                const s = getSubmission(e.submissionId);
                return (
                  <li key={e.submissionId} className="rounded-xl border border-border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold">
                        {s?.team ?? e.submissionId}
                        {s ? <span className="font-normal text-muted-foreground"> · {s.project}</span> : null}
                      </p>
                      <span className="text-sm font-semibold tabular-nums">{e.total}/100</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Relevance {e.problemRelevance} · Innovation {e.innovation} · Impact {e.impact} · Feasibility{" "}
                      {e.feasibility} · Presentation {e.presentation}
                    </p>
                    {e.notes ? <p className="mt-1.5 text-sm leading-relaxed">{e.notes}</p> : null}
                    <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
                      <Link to="/judge/submissions/$id" params={{ id: e.submissionId }}>
                        Open submission
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>
          </section>
        )}
      </div>

      <div className="mt-4 space-y-2">
        <HumanDecidesNote />
        <AiNote>AI signals are never merged into human evaluation totals.</AiNote>
      </div>
    </AppShell>
  );
}
