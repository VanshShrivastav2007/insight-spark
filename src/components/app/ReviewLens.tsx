import { Link } from "@tanstack/react-router";
import { AlertTriangle, Eye, Gem, Layers, Sparkles, TrendingUp } from "lucide-react";
import { SUBMISSIONS, STATS, type Submission } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { AiRecommendationTag, isPotentialGem } from "./GemEvidence";
import { useDecisions } from "@/lib/decision-store";

function overlooked(): Submission[] {
  return [...SUBMISSIONS]
    .filter((s) => isPotentialGem(s) && !s.reviewed)
    .sort(
      (a, b) =>
        b.scores.innovationSignal +
        b.scores.impact -
        b.scores.presentationQuality -
        (a.scores.innovationSignal + a.scores.impact - a.scores.presentationQuality),
    )
    .slice(0, 5);
}

/** Review Lens — how AI is currently pointing your attention. */
export function ReviewLens() {
  const gems = SUBMISSIONS.filter(isPotentialGem).length;
  const highSimilarity = SUBMISSIONS.filter((s) => s.scores.similarity >= 80).length;
  const strongWeakDeck = SUBMISSIONS.filter(
    (s) => s.scores.innovationSignal >= 75 && s.scores.presentationQuality <= 55,
  ).length;
  const polishedGeneric = SUBMISSIONS.filter(
    (s) => s.scores.presentationQuality >= 82 && s.scores.innovationSignal <= 55,
  ).length;

  const lenses = [
    {
      icon: <Gem className="size-4 text-gem" />,
      label: "Substance over polish",
      value: gems,
      note: "High innovation and impact behind an average or weak deck.",
      to: "/judge/gems" as const,
    },
    {
      icon: <Layers className="size-4 text-primary" />,
      label: "Crowded ideas",
      value: highSimilarity,
      note: "80%+ similarity to another submission — read the key difference first.",
      to: "/judge/clusters" as const,
    },
    {
      icon: <TrendingUp className="size-4 text-success" />,
      label: "Weak deck, strong build",
      value: strongWeakDeck,
      note: "Presentation is the bottleneck, not the engineering.",
      to: "/judge/queue" as const,
    },
    {
      icon: <AlertTriangle className="size-4 text-warning" />,
      label: "Polished but generic",
      value: polishedGeneric,
      note: "Great slides, low differentiation. Verify the claim, not the design.",
      to: "/judge/submissions" as const,
    },
  ];

  return (
    <section className="card-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Eye className="size-4 text-primary" /> Review Lens — AI insights
          </h2>
          <p className="mt-1 text-xs text-muted-foreground">
            How the {STATS.total} submissions in this competition look through each lens. Signals are relative to this
            pool only.
          </p>
        </div>
        <AiRecommendationTag />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {lenses.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className="rounded-xl border border-border bg-muted/30 p-3 transition-all hover:border-primary/35 hover:bg-secondary/60"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-2 text-sm font-semibold">
                {l.icon} {l.label}
              </p>
              <span className="text-xl font-semibold tabular-nums">{l.value}</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{l.note}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/** What You Might Miss — unreviewed, differentiated, badly presented. */
export function WhatYouMightMiss() {
  const { decisions } = useDecisions();
  const items = overlooked().filter((s) => !decisions[s.id]);

  return (
    <section className="card-surface p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <Sparkles className="size-4 text-gem" /> What you might miss
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">
        Not yet reviewed, high innovation and impact, weak presentation — the submissions most likely to be skipped.
      </p>
      <ul className="mt-4 space-y-2">
        {items.map((s) => (
          <li key={s.id} className="rounded-xl border border-gem/25 bg-gem/8 p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="min-w-0 truncate text-sm font-semibold">
                {s.project} <span className="font-normal text-muted-foreground">· {s.team}</span>
              </p>
              <span className="text-[11px] text-muted-foreground">{s.category}</span>
            </div>
            <p className="mt-1 grid grid-cols-3 gap-2 text-[11px] text-muted-foreground">
              <span>
                Innovation <strong className="text-success">{s.scores.innovationSignal}</strong>
              </span>
              <span>
                Impact <strong className="text-foreground">{s.scores.impact}</strong>
              </span>
              <span>
                Deck <strong className="text-warning">{s.scores.presentationQuality}</strong>
              </span>
            </p>
            <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
              <Link to="/judge/submissions/$id" params={{ id: s.id }}>
                Review now
              </Link>
            </Button>
          </li>
        ))}
        {items.length === 0 ? (
          <li className="text-xs text-muted-foreground">
            Nothing left in this lens — every flagged submission has a decision.
          </li>
        ) : null}
      </ul>
    </section>
  );
}
