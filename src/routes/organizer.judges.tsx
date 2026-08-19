import { createFileRoute } from "@tanstack/react-router";
import { Mail, UserPlus, Users } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { HumanDecidesNote, SectionHeading, StatCard } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { JUDGES, STATS } from "@/lib/demo-data";

export const Route = createFileRoute("/organizer/judges")({
  head: () => ({
    meta: [
      { title: "Judges — HackSort AI" },
      {
        name: "description",
        content:
          "Judge roster with assignment counts, completion progress and average human scores, so organizers can rebalance the workload before the deadline.",
      },
      { property: "og:title", content: "Judges — HackSort AI" },
      {
        property: "og:description",
        content: "Assignments, completion progress and average scoring per judge.",
      },
    ],
  }),
  component: JudgesPage,
});

function JudgesPage() {
  const assigned = JUDGES.reduce((a, j) => a + j.assigned, 0);
  const completed = JUDGES.reduce((a, j) => a + j.completed, 0);

  return (
    <AppShell role="organizer">
      <SectionHeading
        title="Judges"
        subtitle="Reviews are assigned so every submission gets human eyes. AI ordering only affects the sequence, never the coverage."
        action={
          <Button onClick={() => toast.success("Invitation sent (demo)", { description: "The judge will receive an email invite." })}>
            <UserPlus className="size-4" /> Invite judge
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Active judges" value={JUDGES.length} icon={<Users className="size-4" />} />
        <StatCard label="Assignments" value={assigned} hint={`Across ${STATS.total} submissions`} />
        <StatCard label="Completed reviews" value={completed} tone="success" hint={`${Math.round((completed / assigned) * 100)}% done`} />
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {JUDGES.map((j) => {
          const pct = Math.round((j.completed / j.assigned) * 100);
          return (
            <article key={j.id} className="card-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-base font-semibold">{j.name}</h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">{j.affiliation}</p>
                </div>
                <Badge variant={pct > 60 ? "default" : "secondary"}>{pct}% complete</Badge>
              </div>
              <Progress value={pct} className="mt-4" />
              <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
                <div>
                  <p className="text-muted-foreground">Assigned</p>
                  <p className="text-lg font-semibold tabular-nums">{j.assigned}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Completed</p>
                  <p className="text-lg font-semibold tabular-nums">{j.completed}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Avg human score</p>
                  <p className="text-lg font-semibold tabular-nums">{j.avgScore}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => toast.success(`Reminder sent to ${j.name} (demo)`)}
              >
                <Mail className="size-4" /> Send reminder
              </Button>
            </article>
          );
        })}
      </div>

      <div className="mt-4">
        <HumanDecidesNote />
      </div>
    </AppShell>
  );
}
