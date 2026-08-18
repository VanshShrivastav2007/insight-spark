import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileStack, Gem, Layers, ListOrdered, CheckCircle2, Clock } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { SectionHeading, StatCard, GemBadge, AiNote } from "@/components/app/primitives";
import { CategoryChart, SignalDistributionChart } from "@/components/app/charts";
import { SubmissionCard } from "@/components/app/SubmissionCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { HIDDEN_GEMS, SATURATION_BOARD, STATS, SUBMISSIONS } from "@/lib/demo-data";

export const Route = createFileRoute("/judge/")({
  head: () => ({
    meta: [
      { title: "Judge workspace — HackSort AI" },
      {
        name: "description",
        content:
          "Judge dashboard for HackSort AI: 500 analyzed submissions, 42 high-priority reviews, 17 potential hidden gems and explainable innovation signals.",
      },
      { property: "og:title", content: "Judge workspace — HackSort AI" },
      {
        property: "og:description",
        content: "Priority queue, similarity clusters and hidden gem detection for hackathon judges.",
      },
    ],
  }),
  component: JudgeHome,
});

function JudgeHome() {
  const queue = [...SUBMISSIONS]
    .filter((s) => s.priority === "High Priority")
    .sort((a, b) => b.scores.innovationSignal - a.scores.innovationSignal)
    .slice(0, 3);
  const progress = Math.round((STATS.reviewed / STATS.total) * 100);

  return (
    <AppShell role="judge">
      <SectionHeading
        title="Judging overview"
        subtitle="HackSort AI ranks where your attention is most useful. It does not rank winners — every signal links back to the original submission."
        action={
          <Button asChild>
            <Link to="/judge/queue">
              Open priority queue <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total submissions" value={STATS.total} icon={<FileStack className="size-4" />} />
        <StatCard label="Reviewed" value={STATS.reviewed} tone="success" icon={<CheckCircle2 className="size-4" />} />
        <StatCard label="Remaining" value={STATS.remaining} icon={<Clock className="size-4" />} />
        <StatCard label="High priority" value={STATS.highPriority} tone="warning" icon={<ListOrdered className="size-4" />} />
        <StatCard label="Potential hidden gems" value={STATS.hiddenGems} tone="gem" icon={<Gem className="size-4" />} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="card-surface p-5 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Your review progress</h2>
            <span className="text-xs text-muted-foreground">Deadline Mar 19, 18:00</span>
          </div>
          <Progress value={progress} className="mt-4" />
          <div className="mt-3 grid gap-3 text-xs text-muted-foreground sm:grid-cols-3">
            <span>{STATS.reviewed} reviewed ({progress}%)</span>
            <span>{STATS.remaining} remaining</span>
            <span>{STATS.highPriority} flagged high priority</span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[
              { label: "Similarity clusters", value: STATS.clusters, to: "/judge/clusters" as const },
              { label: "Highly saturated areas", value: STATS.saturated, to: "/judge/landscape" as const },
              { label: "Underexplored areas", value: SATURATION_BOARD.underexplored.length, to: "/judge/landscape" as const },
            ].map((c) => (
              <Link key={c.label} to={c.to} className="rounded-xl border border-border p-3 transition-colors hover:bg-secondary/60">
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="text-2xl font-semibold tabular-nums">{c.value}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="card-surface flex flex-col p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Gem className="size-4 text-gem" /> Today's hidden gem shortlist
          </h2>
          <ul className="mt-3 flex-1 space-y-2">
            {HIDDEN_GEMS.slice(0, 4).map((g) => (
              <li key={g.id}>
                <Link
                  to="/judge/submissions/$id"
                  params={{ id: g.id }}
                  className="block rounded-xl border border-border p-3 transition-colors hover:bg-secondary/60"
                >
                  <p className="text-sm font-semibold">{g.team}</p>
                  <p className="truncate text-xs text-muted-foreground">{g.project}</p>
                  <p className="mt-1.5 text-[11px] text-muted-foreground">
                    Signal <strong className="text-success">{g.scores.innovationSignal}</strong> · Deck{" "}
                    <strong className="text-chart-7">{g.scores.presentationQuality}</strong>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" size="sm" className="mt-3">
            <Link to="/judge/gems">See all {STATS.hiddenGems} potential hidden gems</Link>
          </Button>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <CategoryChart />
        <SignalDistributionChart />
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Layers className="size-4 text-primary" /> Next in your queue
          </h2>
          <GemBadge />
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {queue.map((s) => (
            <SubmissionCard key={s.id} submission={s} />
          ))}
        </div>
        <div className="mt-4">
          <AiNote>
            Signals are computed relative to this competition's 500 submissions. AI-generated insight — verify against
            the original submission.
          </AiNote>
        </div>
      </div>
    </AppShell>
  );
}
