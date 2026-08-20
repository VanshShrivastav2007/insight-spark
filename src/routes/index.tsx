import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Layers,
  Sparkles,
  Gem,
  Map as MapIcon,
  ListOrdered,
  ScanSearch,
  ShieldCheck,
  Users,
  FileStack,
  BrainCircuit,
  PlayCircle,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { Button } from "@/components/ui/button";
import { STATS } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HackSort AI — See beyond the submission" },
      {
        name: "description",
        content:
          "AI-powered innovation discovery for faster, smarter and more structured hackathon judging. Surface hidden gems, map similarity clusters and keep humans in control.",
      },
      { property: "og:title", content: "HackSort AI — See beyond the submission" },
      {
        property: "og:description",
        content:
          "AI-powered innovation discovery for hackathon judging: similarity clusters, problem saturation, hidden gem detection and explainable signals.",
      },
    ],
  }),
  component: Landing,
});

const PROBLEMS = [
  {
    icon: <FileStack className="size-5" />,
    title: "Too many submissions",
    body: "500 decks, a two-day judging window and no structured way to decide where to start reading.",
  },
  {
    icon: <Layers className="size-5" />,
    title: "Repetitive ideas",
    body: "31 crop-disease classifiers and 28 study assistants compete for the same attention while judges read them one by one.",
  },
  {
    icon: <Gem className="size-5" />,
    title: "Hidden innovation",
    body: "Genuinely different projects get skimmed because the deck is weak, not because the work is.",
  },
];

const STEPS = [
  { n: 1, title: "Understand submissions", body: "Parse each deck into problem, user, solution, technology, impact and feasibility." },
  { n: 2, title: "Map similarities", body: "Embed submissions and cluster them by problem area and approach." },
  { n: 3, title: "Detect innovation signals", body: "Score differentiation relative to the actual pool — not an absolute verdict." },
  { n: 4, title: "Surface hidden gems", body: "Flag strong project signals paired with weak presentation signals." },
  { n: 5, title: "Let judges verify and decide", body: "Every signal links back to the original submission for human review." },
];

const FEATURES = [
  { icon: <ScanSearch className="size-5" />, title: "Submission Intelligence", body: "Structured extraction of every submission into comparable fields." },
  { icon: <Layers className="size-5" />, title: "Similarity Clustering", body: "See which teams are solving the same problem the same way." },
  { icon: <Sparkles className="size-5" />, title: "Innovation Signals", body: "Differentiation measured against the submissions actually in the pool." },
  { icon: <Gem className="size-5" />, title: "Hidden Gem Detection", body: "Strong project signals with weak presentation get flagged, not buried." },
  { icon: <MapIcon className="size-5" />, title: "Problem Landscape", body: "Saturated and underexplored problem areas on one page." },
  { icon: <ListOrdered className="size-5" />, title: "Judge Priority Queue", body: "An ordered reading path instead of an alphabetical list." },
  { icon: <BrainCircuit className="size-5" />, title: "AI Explainability", body: "Every signal comes with a 'Why highlighted?' answer." },
  { icon: <Users className="size-5" />, title: "Human-in-the-loop judging", body: "Human scores stay separate from AI signals, always." },
];

function DashboardMockup() {
  return (
    <div className="card-surface overflow-hidden p-0 shadow-lift">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-3">
        <LogoMark className="size-6 rounded-lg" />
        <span className="text-xs font-semibold">Judge workspace · Priority Queue</span>
        <span className="ml-auto rounded-full border border-gem/40 bg-gem/12 px-2 py-0.5 text-[10px] font-semibold text-gem">
          17 potential hidden gems
        </span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {[
          { k: "Total", v: "500" },
          { k: "Reviewed", v: "128" },
          { k: "High priority", v: "42" },
        ].map((m) => (
          <div key={m.k} className="rounded-xl border border-border p-3">
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{m.k}</p>
            <p className="text-xl font-semibold tabular-nums">{m.v}</p>
          </div>
        ))}
      </div>
      <div className="space-y-2 px-4 pb-4">
        {[
          { t: "AgriRecover", p: "Post-Flood Crop Recovery Advisor", sig: 91, pres: 48, gem: true },
          { t: "SilverStep", p: "Ambient Fall Risk Sensing", sig: 86, pres: 51, gem: true },
          { t: "FarmAI", p: "LeafScan Disease Classifier", sig: 41, pres: 92, gem: false },
        ].map((r) => (
          <div key={r.t} className="flex items-center gap-3 rounded-xl border border-border p-3">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {r.t} {r.gem ? <span className="text-gem">⭐</span> : null}
              </p>
              <p className="truncate text-xs text-muted-foreground">{r.p}</p>
            </div>
            <div className="w-24 shrink-0">
              <p className="text-[10px] text-muted-foreground">Signal {r.sig}</p>
              <div className="mt-1 h-1.5 rounded-full bg-muted">
                <div className="h-full rounded-full bg-success" style={{ width: `${r.sig}%` }} />
              </div>
              <p className="mt-1.5 text-[10px] text-muted-foreground">Deck {r.pres}</p>
              <div className="mt-1 h-1.5 rounded-full bg-muted">
                <div className="h-full rounded-full bg-chart-7" style={{ width: `${r.pres}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
          <Link to="/" aria-label="HackSort AI home">
            <Logo />
          </Link>
          <nav aria-label="Primary" className="ml-auto hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
            <a href="#problem" className="transition-colors hover:text-foreground">
              Problem
            </a>
            <a href="#how" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#humans" className="transition-colors hover:text-foreground">
              Human-in-the-loop
            </a>
          </nav>
          <Button asChild size="sm" className="ml-auto md:ml-0">
            <Link to="/demo">Try Interactive Demo</Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium shadow-soft">
              <Sparkles className="size-3.5 text-primary-glow" /> AI-powered judging assistant
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              HackSort <span className="text-brand-gradient">AI</span>
            </h1>
            <p className="mt-3 text-xl font-medium text-primary sm:text-2xl">See beyond the submission.</p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              AI-powered innovation discovery for faster, smarter and more structured hackathon judging.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/demo">
                  Try Interactive Demo <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/organizer/competitions/new">Create Competition</Link>
              </Button>
              <Button asChild size="lg" variant="ghost">
                <Link to="/login">
                  <PlayCircle className="size-4" /> View Product Demo
                </Link>
              </Button>
            </div>
            <dl className="mt-9 grid max-w-md grid-cols-3 gap-4">
              {[
                { k: "Submissions analyzed", v: STATS.total },
                { k: "Similarity clusters", v: STATS.clusters },
                { k: "Potential hidden gems", v: STATS.hiddenGems },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.k}</dt>
                  <dd className="text-2xl font-semibold tabular-nums">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <DashboardMockup />
        </div>
      </section>

      <section id="problem" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">The problem</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight">
          1000 submissions. Limited judging time. Important ideas can get lost.
        </h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PROBLEMS.map((p) => (
            <article key={p.title} className="card-surface p-5 transition-all hover:shadow-lift">
              <span className="flex size-10 items-center justify-center rounded-xl bg-secondary text-primary">{p.icon}</span>
              <h3 className="mt-4 text-base font-semibold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="how" className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">How HackSort AI works</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">Five steps from raw decks to a reading order</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-5">
            {STEPS.map((s) => (
              <li key={s.n} className="card-surface p-5">
                <span className="flex size-8 items-center justify-center rounded-lg bg-brand-gradient text-sm font-semibold text-primary-foreground">
                  {s.n}
                </span>
                <h3 className="mt-3 text-sm font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Platform</p>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight">Built for the reality of judging at scale</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <article key={f.title} className="card-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-lift">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent text-accent-foreground">{f.icon}</span>
              <h3 className="mt-4 text-sm font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="humans" className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="card-surface grid gap-8 p-8 md:grid-cols-2 md:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              <ShieldCheck className="size-3.5" /> Human-in-the-loop by design
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">AI assists. Humans decide.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              HackSort AI does not choose winners and does not produce a final ranking. It analyses the submission
              landscape, shows what is repetitive, what is different and what may have been overlooked — then hands the
              decision to the judge with evidence attached.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              "No automatic winner selection and no final AI ranking.",
              "Every signal has a 'Why highlighted?' explanation tied to the pool.",
              "Human evaluation scores are stored separately from AI signals.",
              "Underexplored areas are labelled 'Human Review Recommended', never 'better'.",
              "Original decks, demos and repositories are one click away from every signal.",
            ].map((t) => (
              <li key={t} className="flex gap-2.5 rounded-lg border border-border p-3">
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-gradient py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground">Start Exploring</h2>
          <p className="mt-3 text-sm text-primary-foreground/80">
            Open the judge workspace with 500 analyzed demo submissions, 38 similarity clusters and 17 potential hidden
            gems.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/demo">
                Try Interactive Demo <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/judge/gems">Open Potential Hidden Gems</Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:px-6">
          <Logo />
          <p>Prototype with simulated AI analysis and realistic demo data. AI assists. Humans decide.</p>
        </div>
      </footer>
    </div>
  );
}
