import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Plus } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { SectionHeading } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/organizer/competitions/")({
  head: () => ({
    meta: [
      { title: "Competitions — HackSort AI" },
      {
        name: "description",
        content:
          "All competitions managed in HackSort AI, with submission counts, judging windows and weighted evaluation criteria per event.",
      },
      { property: "og:title", content: "Competitions — HackSort AI" },
      {
        property: "og:description",
        content: "Manage hackathons, judging windows and weighted criteria.",
      },
    ],
  }),
  component: CompetitionsPage,
});

const COMPETITIONS = [
  {
    name: "National Innovation Hack 2026",
    status: "Judging in progress",
    tone: "default" as const,
    window: "Mar 01 – Mar 19, 2026",
    submissions: 500,
    judges: 4,
    criteria: "Problem relevance 20 · Innovation 25 · Impact 20 · Feasibility 15 · Prototype 10 · Presentation 10",
  },
  {
    name: "Climate Resilience Sprint",
    status: "Submissions open",
    tone: "secondary" as const,
    window: "Apr 04 – Apr 20, 2026",
    submissions: 87,
    judges: 3,
    criteria: "Problem relevance 25 · Innovation 20 · Impact 25 · Feasibility 20 · Presentation 10",
  },
  {
    name: "Campus HealthTech Challenge 2025",
    status: "Completed",
    tone: "outline" as const,
    window: "Oct 12 – Oct 28, 2025",
    submissions: 214,
    judges: 5,
    criteria: "Problem relevance 20 · Innovation 20 · Impact 20 · Feasibility 20 · Prototype 20",
  },
];

function CompetitionsPage() {
  return (
    <AppShell role="organizer">
      <SectionHeading
        title="Competitions"
        subtitle="Each competition has its own submission pool, weighted criteria and judge roster. Signals are always computed within a single competition."
        action={
          <Button asChild>
            <Link to="/organizer/competitions/new">
              <Plus className="size-4" /> New competition
            </Link>
          </Button>
        }
      />

      <div className="grid gap-4">
        {COMPETITIONS.map((c) => (
          <article key={c.name} className="card-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold">{c.name}</h2>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <CalendarDays className="size-3.5" /> {c.window}
                </p>
              </div>
              <Badge variant={c.tone}>{c.status}</Badge>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-border p-3">
                <p className="text-xs text-muted-foreground">Submissions</p>
                <p className="text-xl font-semibold tabular-nums">{c.submissions}</p>
              </div>
              <div className="rounded-xl border border-border p-3">
                <p className="text-xs text-muted-foreground">Judges</p>
                <p className="text-xl font-semibold tabular-nums">{c.judges}</p>
              </div>
              <div className="rounded-xl border border-border p-3 sm:col-span-1">
                <p className="text-xs text-muted-foreground">Weighted criteria</p>
                <p className="mt-1 text-[11px] leading-relaxed">{c.criteria}</p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-4">
              <Link to="/organizer/submissions">
                View submissions <ArrowRight className="size-4" />
              </Link>
            </Button>
          </article>
        ))}
      </div>
    </AppShell>
  );
}
