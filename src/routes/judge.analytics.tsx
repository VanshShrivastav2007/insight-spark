import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AiNote, SectionHeading, StatCard } from "@/components/app/primitives";
import {
  CategoryChart,
  CategoryPie,
  SignalDistributionChart,
  TrendChart,
  InnovationVsPresentationScatter,
} from "@/components/app/charts";
import { HIDDEN_GEMS, STATS, SUBMISSIONS } from "@/lib/demo-data";

export const Route = createFileRoute("/judge/analytics")({
  head: () => ({
    meta: [
      { title: "Judging Analytics — HackSort AI" },
      {
        name: "description",
        content:
          "Distribution of innovation signals, category volume, submission trend and the gap between project quality and presentation quality across 500 submissions.",
      },
      { property: "og:title", content: "Judging Analytics — HackSort AI" },
      {
        property: "og:description",
        content: "Signal distribution, category volume and overlooked-candidate analysis for judges.",
      },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const avgSignal = Math.round(SUBMISSIONS.reduce((a, s) => a + s.scores.innovationSignal, 0) / SUBMISSIONS.length);
  const avgDeck = Math.round(SUBMISSIONS.reduce((a, s) => a + s.scores.presentationQuality, 0) / SUBMISSIONS.length);
  const working = SUBMISSIONS.filter((s) => s.prototype === "Working prototype").length;

  return (
    <AppShell role="judge">
      <SectionHeading
        title="Judging Analytics"
        subtitle="Aggregate view of the submission pool. Use it to calibrate what 'strong' means inside this competition."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Average innovation signal" value={avgSignal} hint="Relative to this pool" />
        <StatCard label="Average presentation quality" value={avgDeck} tone="warning" />
        <StatCard label="Working prototypes" value={working} tone="success" />
        <StatCard label="Potential hidden gems" value={HIDDEN_GEMS.length} tone="gem" hint={`of ${STATS.total} submissions`} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <TrendChart />
        <SignalDistributionChart />
        <CategoryChart />
        <CategoryPie />
      </div>

      <div className="mt-4">
        <InnovationVsPresentationScatter />
      </div>

      <div className="mt-4">
        <AiNote>
          All values are derived from simulated analysis of this demo competition. AI-generated insight — verify against
          the original submissions.
        </AiNote>
      </div>
    </AppShell>
  );
}
