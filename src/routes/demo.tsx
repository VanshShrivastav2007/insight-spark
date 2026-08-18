import type React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Gavel, Trophy, Upload, PlayCircle } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Demo accounts — HackSort AI" },
      {
        name: "description",
        content:
          "Enter the HackSort AI prototype as an organizer, judge or participant. No signup required — all roles are preloaded with 500 analyzed demo submissions.",
      },
      { property: "og:title", content: "Demo accounts — HackSort AI" },
      {
        property: "og:description",
        content: "Pick a demo role: organizer console, judge workspace or participant submission portal.",
      },
    ],
  }),
  component: DemoPicker,
});

const ROLES: { to: "/organizer" | "/judge" | "/participant"; icon: React.ReactNode; name: string; person: string; body: string; featured?: boolean }[] = [
  {
    to: "/organizer",
    icon: <Trophy className="size-5" />,
    name: "Organizer Demo",
    person: "Meera Iyer · National Innovation Hack 2026",
    body: "Competition setup, submission processing status, problem landscape, judge management and cross-judge analytics.",
  },
  {
    to: "/judge",
    icon: <Gavel className="size-5" />,
    name: "Judge Demo",
    person: "Dr. Anita Rao · Agriculture & Climate track",
    body: "Priority queue, similarity clusters, potential hidden gems, deck viewer, side-by-side comparison and evaluations.",
    featured: true,
  },
  {
    to: "/participant",
    icon: <Upload className="size-5" />,
    name: "Participant Demo",
    person: "Team AgriRecover · IIT Kharagpur",
    body: "Full submission flow with upload progress, submission ID and simulated AI analysis status.",
  },
];

function DemoPicker() {
  return (
    <div className="min-h-screen bg-soft-gradient">
      <header className="border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center px-4 sm:px-6">
          <Link to="/" aria-label="HackSort AI home">
            <Logo />
          </Link>
          <Button asChild variant="ghost" size="sm" className="ml-auto">
            <Link to="/">Back to landing page</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h1 className="text-3xl font-semibold tracking-tight">Choose a demo role</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          This prototype uses simulated AI analysis over 500 realistic demo submissions. No authentication is required —
          pick a role and the workspace opens with data already analyzed.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {ROLES.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="card-surface group flex flex-col p-5 transition-all hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className="flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-primary-foreground">
                {r.icon}
              </span>
              <h2 className="mt-4 flex items-center gap-2 text-base font-semibold">
                {r.name}
                {r.featured ? (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    Best for demo
                  </span>
                ) : null}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.person}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                Enter workspace <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>

        <section className="card-surface mt-8 p-6">
          <h2 className="flex items-center gap-2 text-sm font-semibold">
            <PlayCircle className="size-4 text-primary" /> Guided product demo (2 minutes)
          </h2>
          <ol className="mt-4 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {[
              "Open the Judge workspace — 500 submissions, 128 reviewed.",
              "Filter to Agriculture (120) and open the Submission Landscape.",
              "See Crop Disease highly saturated, Flood Recovery underexplored.",
              "Open a similarity cluster and read the 84% / 78% matches.",
              "Open Potential Hidden Gems and select AgriRecover.",
              "Compare project signals against presentation quality.",
              "Read 'Why highlighted?' and the closest similar submissions.",
              "Open the original deck viewer, then the demo and GitHub links.",
              "Compare AgriRecover with FarmAI side by side.",
              "Enter a human evaluation — kept separate from AI signals.",
            ].map((step, i) => (
              <li key={step} className="flex gap-2.5 rounded-lg border border-border p-3">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          <Button asChild className="mt-5">
            <Link to="/judge">
              Start the guided flow <ArrowRight className="size-4" />
            </Link>
          </Button>
        </section>
      </main>
    </div>
  );
}
