import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Layers } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { AiNote, SaturationBadge, SectionHeading } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { PROBLEM_AREAS, SUBMISSIONS } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/judge/clusters")({
  head: () => ({
    meta: [
      { title: "Similarity Clusters — HackSort AI" },
      {
        name: "description",
        content:
          "Group submissions that solve the same problem with the same approach, then read the key difference between each pair before judging.",
      },
      { property: "og:title", content: "Similarity Clusters — HackSort AI" },
      {
        property: "og:description",
        content: "Cluster view showing overlapping submissions and what actually differs between them.",
      },
    ],
  }),
  component: ClustersPage,
});

function ClustersPage() {
  const clusters = [...PROBLEM_AREAS].sort((a, b) => b.count - a.count);
  const [activeArea, setActiveArea] = useState(clusters[0]?.area ?? "");
  const active = clusters.find((c) => c.area === activeArea);
  const members = SUBMISSIONS.filter((s) => s.problemArea === activeArea)
    .sort((a, b) => b.scores.similarity - a.scores.similarity)
    .slice(0, 12);

  return (
    <AppShell role="judge">
      <SectionHeading
        title="Similarity Clusters"
        subtitle="A cluster means these submissions target the same problem area. High similarity is not plagiarism — it means the differentiation, if any, is below the surface."
      />

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
        <div className="card-surface max-h-[720px] overflow-y-auto p-3">
          <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {clusters.length} clusters
          </p>
          <ul className="space-y-1.5">
            {clusters.map((c) => (
              <li key={c.area}>
                <button
                  onClick={() => setActiveArea(c.area)}
                  className={cn(
                    "w-full rounded-lg border p-3 text-left transition-colors",
                    c.area === activeArea ? "border-primary/40 bg-accent" : "border-border hover:bg-secondary/60",
                  )}
                >
                  <p className="text-sm font-semibold">{c.area}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {c.category} · {c.count} submissions
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {active ? (
          <div className="space-y-4">
            <section className="card-surface p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-2 text-lg font-semibold">
                    <Layers className="size-4 text-primary" /> {active.area}
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {active.category} · {active.count} submissions in this cluster
                  </p>
                </div>
                <SaturationBadge saturation={active.saturation} />
              </div>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  ["Shared problem", active.problem],
                  ["Dominant approach", active.approach],
                  ["Typical target user", active.targetUser],
                  ["Common technology", active.tech.join(", ")],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-border p-3">
                    <dt className="text-xs font-semibold text-muted-foreground">{k}</dt>
                    <dd className="mt-1 text-sm leading-relaxed">{v}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="card-surface p-5">
              <h3 className="text-sm font-semibold">Members and key differences</h3>
              <ul className="mt-3 space-y-2">
                {members.map((s) => (
                  <li key={s.id} className="rounded-xl border border-border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-semibold">
                        {s.team} <span className="font-normal text-muted-foreground">· {s.project}</span>
                      </p>
                      <span className="text-xs text-muted-foreground">
                        Similarity <strong className="text-foreground">{s.scores.similarity}%</strong> · Signal{" "}
                        <strong className="text-foreground">{s.scores.innovationSignal}</strong>
                      </span>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {s.similar[0]?.keyDifference ?? "No close match inside this cluster — approach departs from the dominant pattern."}
                    </p>
                    <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
                      <Link to="/judge/submissions/$id" params={{ id: s.id }}>
                        Open analysis <ArrowRight className="size-3.5" />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <AiNote>
                  Similarity is computed from problem statement, target user, approach and technology overlap. AI-generated
                  insight — verify against the original submission.
                </AiNote>
              </div>
            </section>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
