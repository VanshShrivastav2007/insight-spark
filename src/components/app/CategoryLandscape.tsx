import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Layers, Sparkles } from "lucide-react";
import {
  CATEGORIES,
  CATEGORY_COUNTS,
  PROBLEM_AREAS,
  SUBMISSIONS,
  type Category,
  type Submission,
} from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { AiNote, GemBadge, PriorityBadge, SaturationBadge } from "@/components/app/primitives";
import { AiRecommendationTag } from "@/components/app/GemEvidence";
import { cn } from "@/lib/utils";

interface Cluster {
  area: string;
  saturation: ReturnType<typeof areaMeta>["saturation"];
  approach: string;
  problem: string;
  members: Submission[];
}

function areaMeta(area: string) {
  return (
    PROBLEM_AREAS.find((p) => p.area === area) ?? {
      saturation: "Medium" as const,
      approach: "Mixed approaches",
      problem: area,
    }
  );
}

/** Clickable category board: pick a category, see only its submissions grouped into similarity clusters. */
export function CategoryLandscape() {
  const [category, setCategory] = useState<Category>(CATEGORIES[0]!);

  const clusters = useMemo<Cluster[]>(() => {
    const inCategory = SUBMISSIONS.filter((s) => s.category === category);
    const grouped = new Map<string, Submission[]>();
    for (const s of inCategory) {
      const list = grouped.get(s.problemArea) ?? [];
      list.push(s);
      grouped.set(s.problemArea, list);
    }
    return [...grouped.entries()]
      .map(([area, members]) => {
        const meta = areaMeta(area);
        return {
          area,
          saturation: meta.saturation,
          approach: meta.approach,
          problem: meta.problem,
          members: [...members].sort((a, b) => b.scores.similarity - a.scores.similarity),
        };
      })
      .sort((a, b) => b.members.length - a.members.length);
  }, [category]);

  const total = clusters.reduce((sum, c) => sum + c.members.length, 0);
  const gems = clusters.flatMap((c) => c.members).filter((s) => s.hiddenGem).length;

  return (
    <section className="space-y-4">
      <div className="card-surface p-5">
        <h2 className="text-sm font-semibold">Browse by category</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Select a category to see only its submissions, automatically organised into similarity clusters by problem
          area and dominant approach.
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                aria-pressed={active}
                className={cn(
                  "rounded-xl border p-3 text-left transition-all",
                  active
                    ? "border-primary/45 bg-accent glow-ring"
                    : "border-border hover:border-primary/30 hover:bg-secondary/60",
                )}
              >
                <p className="text-sm font-semibold">{c}</p>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{CATEGORY_COUNTS[c]} submissions</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card-surface flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold">
            <Layers className="size-4 text-primary" /> {category}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            {total} submissions · {clusters.length} similarity clusters · {gems} potential hidden gems
          </p>
        </div>
        <AiRecommendationTag />
      </div>

      <div className="grid gap-4">
        {clusters.map((c) => (
          <article key={c.area} className="card-surface p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <h4 className="text-sm font-semibold">{c.area}</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {c.members.length} submissions · dominant approach: {c.approach}
                </p>
              </div>
              <SaturationBadge saturation={c.saturation} />
            </div>

            <ul className="mt-4 grid gap-2 lg:grid-cols-2">
              {c.members.slice(0, 6).map((s) => (
                <li key={s.id} className="rounded-xl border border-border bg-muted/30 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="min-w-0 truncate text-sm font-semibold">
                      {s.team} <span className="font-normal text-muted-foreground">· {s.project}</span>
                    </p>
                    <span className="flex items-center gap-1.5">
                      {s.hiddenGem ? <GemBadge /> : null}
                      <PriorityBadge priority={s.priority} />
                    </span>
                  </div>
                  <p className="mt-1.5 grid grid-cols-2 gap-x-4 text-[11px] text-muted-foreground sm:grid-cols-4">
                    <span>Innovation <strong className="text-foreground">{s.scores.innovationSignal}</strong></span>
                    <span>Impact <strong className="text-foreground">{s.scores.impact}</strong></span>
                    <span>Deck <strong className="text-foreground">{s.scores.presentationQuality}</strong></span>
                    <span>Similar <strong className="text-foreground">{s.scores.similarity}%</strong></span>
                  </p>
                  <p className="mt-1.5 flex gap-1.5 text-[11px] leading-relaxed text-muted-foreground">
                    <Sparkles className="mt-0.5 size-3 shrink-0 text-primary" />
                    {s.similar[0]?.keyDifference ?? "No close match in this cluster — differentiated approach."}
                  </p>
                  <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
                    <Link to="/judge/submissions/$id" params={{ id: s.id }}>
                      Open analysis <ArrowRight className="size-3.5" />
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
            {c.members.length > 6 ? (
              <p className="mt-3 text-[11px] text-muted-foreground">
                + {c.members.length - 6} more in this cluster —{" "}
                <Link to="/judge/submissions" className="font-medium text-primary hover:underline">
                  open the full explorer
                </Link>
                .
              </p>
            ) : null}
          </article>
        ))}
      </div>

      <AiNote>
        Clusters are computed from problem statement, target user, approach and technology overlap within{" "}
        {category.toLowerCase()} submissions only. Participant-selected categories are always preserved.
      </AiNote>
    </section>
  );
}
