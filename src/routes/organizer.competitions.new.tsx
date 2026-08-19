import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/app/AppShell";
import { SectionHeading } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organizer/competitions/new")({
  head: () => ({
    meta: [
      { title: "Create competition — HackSort AI" },
      {
        name: "description",
        content:
          "Set up a hackathon in HackSort AI: tracks, submission window, weighted evaluation criteria and which AI assistance features judges can see.",
      },
      { property: "og:title", content: "Create competition — HackSort AI" },
      {
        property: "og:description",
        content: "Define tracks, dates, weighted criteria and AI assistance settings.",
      },
    ],
  }),
  component: NewCompetition,
});

const DEFAULT_CRITERIA = [
  { name: "Problem relevance", weight: 20 },
  { name: "Innovation", weight: 25 },
  { name: "Impact", weight: 20 },
  { name: "Feasibility", weight: 15 },
  { name: "Prototype quality", weight: 10 },
  { name: "Presentation", weight: 10 },
];

function NewCompetition() {
  const [name, setName] = useState("");
  const [criteria, setCriteria] = useState(DEFAULT_CRITERIA);
  const [tracks, setTracks] = useState<string[]>(["Agriculture", "Healthcare", "Education"]);
  const [newCriterion, setNewCriterion] = useState("");
  const [gems, setGems] = useState(true);
  const [clusters, setClusters] = useState(true);
  const [autoPriority, setAutoPriority] = useState(true);

  const total = useMemo(() => criteria.reduce((a, c) => a + c.weight, 0), [criteria]);
  const balanced = total === 100;

  return (
    <AppShell role="organizer">
      <SectionHeading
        title="Create competition"
        subtitle="Weighted criteria drive the human evaluation form judges fill in. AI signals stay separate and are never folded into these weights."
      />

      <form
        className="grid gap-4 xl:grid-cols-[1fr_380px]"
        onSubmit={(e) => {
          e.preventDefault();
          if (!balanced) {
            toast.error("Criteria weights must total 100.", { description: `Current total is ${total}.` });
            return;
          }
          toast.success("Competition created (demo)", {
            description: `${name || "Untitled competition"} · ${tracks.length} tracks · ${criteria.length} criteria`,
          });
        }}
      >
        <div className="space-y-4">
          <section className="card-surface space-y-4 p-5">
            <h2 className="text-sm font-semibold">Basics</h2>
            <div className="grid gap-2">
              <Label htmlFor="name">Competition name</Label>
              <Input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="National Innovation Hack 2026"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea id="desc" rows={3} placeholder="What should teams build, and for whom?" />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="grid gap-2">
                <Label htmlFor="open">Submissions open</Label>
                <Input id="open" type="date" defaultValue="2026-04-04" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="close">Submissions close</Label>
                <Input id="close" type="date" defaultValue="2026-04-18" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="judge">Judging deadline</Label>
                <Input id="judge" type="date" defaultValue="2026-04-20" />
              </div>
            </div>
          </section>

          <section className="card-surface p-5">
            <h2 className="text-sm font-semibold">Tracks</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Similarity clustering and saturation analysis run inside each track.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const on = tracks.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setTracks((t) => (on ? t.filter((x) => x !== c) : [...t, c]))}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      on ? "border-primary bg-accent text-accent-foreground" : "border-border hover:bg-secondary",
                    )}
                  >
                    {on ? "✓ " : ""}
                    {c}
                  </button>
                );
              })}
            </div>
          </section>

          <section className="card-surface p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold">Weighted evaluation criteria</h2>
              <Badge variant={balanced ? "default" : "destructive"}>Total {total}/100</Badge>
            </div>
            <div className="mt-4 space-y-4">
              {criteria.map((c, i) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between gap-3">
                    <Label className="text-sm">{c.name}</Label>
                    <div className="flex items-center gap-2">
                      <span className="w-10 text-right text-sm font-semibold tabular-nums">{c.weight}%</span>
                      <button
                        type="button"
                        aria-label={`Remove ${c.name}`}
                        onClick={() => setCriteria((cs) => cs.filter((_, idx) => idx !== i))}
                        className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  </div>
                  <Slider
                    className="mt-2"
                    value={[c.weight]}
                    max={50}
                    step={5}
                    onValueChange={([v]) =>
                      setCriteria((cs) => cs.map((x, idx) => (idx === i ? { ...x, weight: v ?? 0 } : x)))
                    }
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Input
                value={newCriterion}
                onChange={(e) => setNewCriterion(e.target.value)}
                placeholder="Add a criterion, e.g. Sustainability"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  if (!newCriterion.trim()) return;
                  setCriteria((cs) => [...cs, { name: newCriterion.trim(), weight: 10 }]);
                  setNewCriterion("");
                }}
              >
                <Plus className="size-4" /> Add
              </Button>
            </div>
            {!balanced ? (
              <p className="mt-3 text-xs text-destructive">
                Weights currently total {total}%. Adjust to 100% before creating the competition.
              </p>
            ) : (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-success">
                <CheckCircle2 className="size-3.5" /> Weights are balanced.
              </p>
            )}
          </section>
        </div>

        <aside className="space-y-4">
          <section className="card-surface p-5">
            <h2 className="text-sm font-semibold">AI assistance</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Controls what judges see. AI never scores or ranks winners.
            </p>
            <div className="mt-4 space-y-4">
              {[
                { label: "Similarity clustering", desc: "Group submissions solving the same problem.", v: clusters, set: setClusters },
                { label: "Hidden gem detection", desc: "Flag strong projects with weak presentation.", v: gems, set: setGems },
                { label: "Priority queue ordering", desc: "Suggest a reading order for judges.", v: autoPriority, set: setAutoPriority },
              ].map((s) => (
                <div key={s.label} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.desc}</p>
                  </div>
                  <Switch checked={s.v} onCheckedChange={s.set} />
                </div>
              ))}
            </div>
          </section>

          <section className="card-surface p-5">
            <h2 className="text-sm font-semibold">Summary</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="text-right font-medium">{name || "Untitled"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Tracks</dt>
                <dd className="font-medium">{tracks.length}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Criteria</dt>
                <dd className="font-medium">{criteria.length}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-muted-foreground">Weight total</dt>
                <dd className={cn("font-medium", balanced ? "text-success" : "text-destructive")}>{total}%</dd>
              </div>
            </dl>
            <Button type="submit" className="mt-4 w-full">
              Create competition
            </Button>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Prototype: no data is stored server-side in this demo.
            </p>
          </section>
        </aside>
      </form>
    </AppShell>
  );
}
