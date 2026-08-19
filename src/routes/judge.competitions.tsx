import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { ArrowRight, CalendarDays, CheckCircle2, LogOut, Ticket, Users } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useJudgeSession } from "@/lib/judge-auth";

export const Route = createFileRoute("/judge/competitions")({
  head: () => ({
    meta: [
      { title: "Your competitions — HackSort AI" },
      {
        name: "description",
        content:
          "Pick the hackathon you are judging. Each judge keeps their own account, assignments and private evaluations per competition.",
      },
      { property: "og:title", content: "Your competitions — HackSort AI" },
      {
        property: "og:description",
        content: "Select a competition to open its priority queue, clusters and hidden gem shortlist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CompetitionsPage,
});

function CompetitionsPage() {
  const navigate = useNavigate();
  const { judge, competitions, selectCompetition, redeemInviteCode, signOut } = useJudgeSession();
  const [invite, setInvite] = useState("");

  const open = (id: string) => {
    selectCompetition(id);
    navigate({ to: "/judge" });
  };

  return (
    <main className="relative min-h-screen bg-soft-gradient">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint opacity-30" aria-hidden />
      <div className="relative mx-auto w-full max-w-5xl px-5 py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" aria-label="HackSort AI home">
            <Logo showTagline />
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              signOut();
              navigate({ to: "/login" });
            }}
          >
            <LogOut className="size-4" /> Sign out
          </Button>
        </div>

        <header className="mt-10">
          <h1 className="text-3xl font-semibold tracking-tight">Your competitions</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {judge ? `${judge.name} · ${judge.affiliation}` : "Judge account"} — choose a competition to enter its judge
            workspace. Your evaluations stay private to your account.
          </p>
        </header>

        <ul className="mt-8 space-y-4">
          {competitions.map((c) => {
            const pct = Math.round((c.completed / Math.max(c.assigned, 1)) * 100);
            return (
              <li key={c.id} className="card-surface p-5 transition-all hover:shadow-lift">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{c.name}</h2>
                      <span
                        className={
                          c.status === "Judging open"
                            ? "rounded-full border border-success/40 bg-success/12 px-2.5 py-0.5 text-[11px] font-semibold text-success"
                            : c.status === "Completed"
                              ? "rounded-full border border-border bg-muted/60 px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground"
                              : "rounded-full border border-warning/40 bg-warning/12 px-2.5 py-0.5 text-[11px] font-semibold text-warning"
                        }
                      >
                        {c.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.organizer} · <CalendarDays className="mb-0.5 inline size-3.5" /> {c.window}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {c.tracks.map((t) => (
                        <span key={t} className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button onClick={() => open(c.id)} disabled={c.status === "Submissions open"}>
                    {c.status === "Completed" ? "View results" : "Enter workspace"} <ArrowRight className="size-4" />
                  </Button>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <Progress value={pct} />
                    <p className="mt-2 text-xs text-muted-foreground">
                      {c.completed} of {c.assigned} assigned submissions reviewed ({pct}%)
                    </p>
                  </div>
                  <p className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" /> {c.submissions} submissions
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="size-3.5" /> multiple judges
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <section className="card-surface mt-6 p-5">
          <h2 className="text-sm font-semibold">Join another competition</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Paste the invite code from your organizer. Try SPRING-2026 or CLIMATE-JAM.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Input
              value={invite}
              onChange={(e) => setInvite(e.target.value)}
              placeholder="Invite code"
              aria-label="Invite code"
              className="h-10 max-w-xs rounded-xl uppercase"
            />
            <Button
              variant="outline"
              onClick={() => {
                const result = redeemInviteCode(invite);
                if (!result.ok) {
                  toast.error("Invite code not recognised");
                  return;
                }
                setInvite("");
                toast.success("Competition added to your account");
              }}
            >
              <Ticket className="size-4" /> Join
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
