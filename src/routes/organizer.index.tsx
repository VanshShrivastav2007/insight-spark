import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, FileStack, Gem, Users, Layers, CheckCircle2, Flame } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { AiNote, SectionHeading, StatCard, SaturationBadge } from "@/components/app/primitives";
import { CategoryChart, TrendChart, SaturationChart } from "@/components/app/charts";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { JUDGES, SATURATION_BOARD, STATS } from "@/lib/demo-data";

export const Route = createFileRoute("/organizer/")({
  head: () => ({
    meta: [
      { title: "Organizer console — HackSort AI" },
      {
        name: "description",
        content:
          "Organizer dashboard for HackSort AI: submission processing status, category volume, problem landscape saturation and judge progress across 500 submissions.",
      },
      { property: "og:title", content: "Organizer console — HackSort AI" },
      {
        property: "og:description",
        content: "Run the competition: intake status, landscape saturation and judge coverage in one console.",
      },
    ],
  }),
  component: OrganizerHome,
});

function OrganizerHome() {
  const totalAssigned = JUDGES.reduce((a, j) => a + j.assigned, 0);
  const totalCompleted = JUDGES.reduce((a, j) => a + j.completed, 0);

  return (
    <AppShell role="organizer">
      <SectionHeading
        title="National Innovation Hack 2026"
        subtitle="Submissions closed Mar 17 · judging closes Mar 19, 18:00. All 500 submissions have completed AI analysis."
        action={
          <Button asChild>
            <Link to="/organizer/competitions/new">
              Create competition <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Submissions received" value={STATS.total} icon={<FileStack className="size-4" />} />
        <StatCard label="Analysis complete" value={STATS.analyzed} tone="success" icon={<CheckCircle2 className="size-4" />} />
        <StatCard label="Problem clusters" value={STATS.clusters} icon={<Layers className="size-4" />} />
        <StatCard label="Saturated areas" value={STATS.saturated} tone="warning" icon={<Flame className="size-4" />} />
        <StatCard label="Potential hidden gems" value={STATS.hiddenGems} tone="gem" icon={<Gem className="size-4" />} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <section className="card-surface p-5 lg:col-span-2">
          <h2 className="text-sm font-semibold">Processing pipeline</h2>
          <div className="mt-4 space-y-4">
            {[
              { label: "Submissions ingested", value: 100, note: "500 / 500" },
              { label: "Decks parsed", value: 100, note: "500 / 500" },
              { label: "Similarity clustering", value: 100, note: `${STATS.clusters} clusters formed` },
              { label: "Judge reviews", value: Math.round((totalCompleted / totalAssigned) * 100), note: `${totalCompleted} / ${totalAssigned} assignments` },
            ].map((p) => (
              <div key={p.label}>
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="font-medium">{p.label}</span>
                  <span className="text-muted-foreground">{p.note}</span>
                </div>
                <Progress value={p.value} className="mt-1.5" />
              </div>
            ))}
          </div>
        </section>

        <section className="card-surface p-5">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <Users className="size-4 text-primary" /> Judge progress
          </h2>
          <ul className="mt-3 space-y-3">
            {JUDGES.map((j) => (
              <li key={j.id}>
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-medium">{j.name}</span>
                  <span className="text-muted-foreground">
                    {j.completed}/{j.assigned}
                  </span>
                </div>
                <Progress value={Math.round((j.completed / j.assigned) * 100)} className="mt-1.5" />
                <p className="mt-1 text-[11px] text-muted-foreground">{j.affiliation}</p>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link to="/organizer/judges">Manage judges</Link>
          </Button>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <TrendChart />
        <CategoryChart />
      </div>

      <div className="mt-4">
        <SaturationChart />
      </div>

      <section className="card-surface mt-4 p-5">
        <h2 className="text-sm font-semibold">Underexplored problem areas worth promoting next year</h2>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {SATURATION_BOARD.underexplored.slice(0, 6).map((a) => (
            <li key={a.area} className="rounded-xl border border-border p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{a.area}</p>
                <SaturationBadge saturation={a.saturation} />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {a.category} · {a.count} submissions · {a.problem}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <AiNote>Saturation reflects this competition only. AI-generated insight — verify before publishing.</AiNote>
        </div>
      </section>
    </AppShell>
  );
}
