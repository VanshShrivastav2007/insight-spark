import { createFileRoute } from "@tanstack/react-router";
import { Flame, Sprout, Scale } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { AiNote, SaturationBadge, SectionHeading, StatCard } from "@/components/app/primitives";
import { SaturationChart, InnovationVsPresentationScatter, CategoryChart } from "@/components/app/charts";
import { CategoryLandscape } from "@/components/app/CategoryLandscape";
import { SATURATION_BOARD, type ProblemArea } from "@/lib/demo-data";

export const Route = createFileRoute("/judge/landscape")({
  head: () => ({
    meta: [
      { title: "Submission Landscape — HackSort AI" },
      {
        name: "description",
        content:
          "Map the hackathon problem landscape: which problem areas are highly saturated, which are underexplored, and where differentiated submissions are hiding.",
      },
      { property: "og:title", content: "Submission Landscape — HackSort AI" },
      {
        property: "og:description",
        content: "Saturated vs underexplored problem areas across 500 submissions.",
      },
    ],
  }),
  component: LandscapePage,
});

function AreaList({
  areas,
  title,
  icon,
  note,
}: {
  areas: ProblemArea[];
  title: string;
  icon: React.ReactNode;
  note: string;
}) {
  return (
    <section className="card-surface p-5">
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        {icon} {title}
      </h2>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
      <ul className="mt-4 space-y-2">
        {areas.slice(0, 8).map((a) => (
          <li key={a.area} className="rounded-xl border border-border p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm font-semibold">{a.area}</p>
              <SaturationBadge saturation={a.saturation} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {a.category} · {a.count} submissions · dominant approach: {a.approach}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function LandscapePage() {
  const { saturated, medium, underexplored } = SATURATION_BOARD;
  return (
    <AppShell role="judge">
      <SectionHeading
        title="Submission Landscape"
        subtitle="Saturation describes how many submissions target the same problem area with the same dominant approach. A saturated area is not a weak area — it just means differentiation is harder to see."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Highly saturated areas" value={saturated.length} tone="warning" icon={<Flame className="size-4" />} />
        <StatCard label="Medium density areas" value={medium.length} icon={<Scale className="size-4" />} />
        <StatCard label="Underexplored areas" value={underexplored.length} tone="success" icon={<Sprout className="size-4" />} />
      </div>

      <div className="mt-4">
        <CategoryLandscape />
      </div>

      <div className="mt-4 grid gap-4">
        <SaturationChart />
        <div className="grid gap-4 lg:grid-cols-2">
          <AreaList
            areas={saturated}
            title="Highly saturated problem areas"
            icon={<Flame className="size-4 text-warning" />}
            note="Many submissions, converging approaches. Look for method-level rather than surface-level differences."
          />
          <AreaList
            areas={underexplored}
            title="Underexplored problem areas"
            icon={<Sprout className="size-4 text-success" />}
            note="Few submissions. Genuine gaps in the landscape — worth reading closely even when the deck is weak."
          />
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <CategoryChart />
          <InnovationVsPresentationScatter />
        </div>
        <AiNote>
          Saturation is computed from this competition's submissions only. AI-generated insight — verify against the
          original submissions.
        </AiNote>
      </div>
    </AppShell>
  );
}
