import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionHeading, StatCard } from "@/components/app/primitives";
import { SubmissionExplorer } from "@/components/app/SubmissionExplorer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HIDDEN_GEMS, STATS, SUBMISSIONS } from "@/lib/demo-data";

export const Route = createFileRoute("/judge/queue")({
  head: () => ({
    meta: [
      { title: "Priority Queue — HackSort AI" },
      {
        name: "description",
        content:
          "An ordered reading path across 500 submissions: high priority, review, standard and potential hidden gems, each with an explainable AI recommendation.",
      },
      { property: "og:title", content: "Priority Queue — HackSort AI" },
      {
        property: "og:description",
        content: "Judge priority queue with innovation signals, similarity and presentation quality side by side.",
      },
    ],
  }),
  component: QueuePage,
});

const gemIds = new Set(HIDDEN_GEMS.map((g) => g.id));

function QueuePage() {
  const [search, setSearch] = useState("");
  const high = SUBMISSIONS.filter((s) => s.priority === "High Priority");
  const review = SUBMISSIONS.filter((s) => s.priority === "Review");
  const standard = SUBMISSIONS.filter((s) => s.priority === "Standard");
  const gems = SUBMISSIONS.filter((s) => gemIds.has(s.id));

  return (
    <AppShell role="judge" search={search} onSearchChange={setSearch}>
      <SectionHeading
        title="Priority Queue"
        subtitle="Ordering is an attention recommendation, not a ranking of quality. Open any submission to see why it was placed here."
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="High priority" value={high.length} tone="warning" hint="Strong signals or flagged gaps" />
        <StatCard label="Review" value={review.length} hint="Moderate differentiation" />
        <StatCard label="Standard" value={standard.length} hint="Follows the dominant cluster pattern" />
        <StatCard label="Potential hidden gems" value={STATS.hiddenGems} tone="gem" hint="Strong project, weak deck" />
      </div>

      <Tabs defaultValue="high">
        <TabsList className="mb-4 flex-wrap">
          <TabsTrigger value="high">High priority ({high.length})</TabsTrigger>
          <TabsTrigger value="review">Review ({review.length})</TabsTrigger>
          <TabsTrigger value="standard">Standard ({standard.length})</TabsTrigger>
          <TabsTrigger value="gems">Potential hidden gems ({gems.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="high">
          <SubmissionExplorer submissions={high} search={search} onSearchChange={setSearch} />
        </TabsContent>
        <TabsContent value="review">
          <SubmissionExplorer submissions={review} search={search} onSearchChange={setSearch} />
        </TabsContent>
        <TabsContent value="standard">
          <SubmissionExplorer submissions={standard} search={search} onSearchChange={setSearch} />
        </TabsContent>
        <TabsContent value="gems">
          <SubmissionExplorer submissions={gems} search={search} onSearchChange={setSearch} />
        </TabsContent>
      </Tabs>
    </AppShell>
  );
}
