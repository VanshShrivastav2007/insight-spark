import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, ArrowRight } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { AiNote, GemBadge, HumanDecidesNote, SectionHeading, ScoreBar, EmptyState } from "@/components/app/primitives";
import { QualityVsPresentation } from "@/components/app/QualityVsPresentation";
import { Button } from "@/components/ui/button";
import { HIDDEN_GEMS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/judge/gems")({
  head: () => ({
    meta: [
      { title: "Potential Hidden Gems — HackSort AI" },
      {
        name: "description",
        content:
          "Submissions with strong project signals or meaningful differentiation that risk being overlooked because of weak presentation quality or a crowded submission pool.",
      },
      { property: "og:title", content: "Potential Hidden Gems — HackSort AI" },
      {
        property: "og:description",
        content: "Strong project signals, weak presentation signals — flagged for human verification.",
      },
    ],
  }),
  component: GemsPage,
});

function GemsPage() {
  const [selectedId, setSelectedId] = useState(
    HIDDEN_GEMS.find((g) => g.team === "AgriRecover")?.id ?? HIDDEN_GEMS[0]?.id ?? "",
  );
  const selected = HIDDEN_GEMS.find((g) => g.id === selectedId);

  return (
    <AppShell role="judge">
      <SectionHeading
        title="Potential Hidden Gems"
        subtitle="Projects that show strong underlying project signals or meaningful differentiation but may be overlooked due to presentation quality, low visibility, or being buried in a large submission pool."
      />

      {HIDDEN_GEMS.length === 0 ? (
        <EmptyState
          icon={<Gem className="size-5" />}
          title="No potential hidden gems in this pool"
          description="No submission currently combines strong project signals with weak presentation signals. This list updates as new submissions are analyzed."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
          <div className="card-surface max-h-[720px] overflow-y-auto p-3">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {HIDDEN_GEMS.length} flagged submissions
            </p>
            <ul className="space-y-2">
              {HIDDEN_GEMS.map((g) => (
                <li key={g.id}>
                  <button
                    onClick={() => setSelectedId(g.id)}
                    aria-current={g.id === selectedId ? "true" : undefined}
                    className={cn(
                      "w-full rounded-xl border p-3 text-left transition-colors",
                      g.id === selectedId ? "border-gem/50 bg-gem/8" : "border-border hover:bg-secondary/60",
                    )}
                  >
                    <p className="text-sm font-semibold">
                      ⭐ {g.team}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{g.project}</p>
                    <p className="mt-1.5 text-[11px] text-muted-foreground">
                      {g.category} · {g.problemArea}
                    </p>
                    <p className="mt-1 text-[11px]">
                      Signal <strong className="text-success">{g.scores.innovationSignal}</strong> · Deck{" "}
                      <strong className="text-chart-7">{g.scores.presentationQuality}</strong>
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {selected ? (
            <div className="space-y-4">
              <section className="card-surface p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-xl font-semibold">{selected.team}</h2>
                      <GemBadge />
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{selected.project}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {selected.id} · {selected.category} · {selected.problemArea} · {selected.college}
                    </p>
                  </div>
                  <Button asChild>
                    <Link to="/judge/submissions/$id" params={{ id: selected.id }}>
                      Open full analysis <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  <ScoreBar label="Innovation Signal" value={selected.scores.innovationSignal} hint="Differentiation relative to the available submissions. Not a guarantee of innovation." />
                  <ScoreBar label="Problem Relevance" value={selected.scores.problemRelevance} />
                  <ScoreBar label="Differentiation" value={selected.scores.solutionDifferentiation} />
                  <ScoreBar label="Impact" value={selected.scores.impact} />
                  <ScoreBar label="Feasibility" value={selected.scores.feasibility} />
                  <ScoreBar label="Presentation Quality" value={selected.scores.presentationQuality} />
                </div>

                <div className="mt-5 rounded-xl border border-gem/30 bg-gem/8 p-4">
                  <p className="text-sm font-semibold text-gem">Reason</p>
                  <p className="mt-1 text-sm leading-relaxed">{selected.recommendation}</p>
                </div>
              </section>

              <section className="card-surface p-5">
                <h3 className="text-sm font-semibold">Why highlighted?</h3>
                <ul className="mt-3 space-y-2">
                  {selected.whyHighlighted.map((r) => (
                    <li key={r} className="flex gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-gem" />
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 space-y-2">
                  <AiNote>AI recommendation — human verification required.</AiNote>
                  <HumanDecidesNote />
                </div>
              </section>

              <QualityVsPresentation submission={selected} />
            </div>
          ) : null}
        </div>
      )}
    </AppShell>
  );
}
