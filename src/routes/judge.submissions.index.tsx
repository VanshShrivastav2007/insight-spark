import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { SectionHeading, AiNote } from "@/components/app/primitives";
import { SubmissionExplorer } from "@/components/app/SubmissionExplorer";
import { SUBMISSIONS } from "@/lib/demo-data";

export const Route = createFileRoute("/judge/submissions/")({
  head: () => ({
    meta: [
      { title: "All submissions — HackSort AI" },
      {
        name: "description",
        content:
          "Browse all 500 analyzed submissions with filters for category, problem area, priority, innovation signal, similarity and presentation quality.",
      },
      { property: "og:title", content: "All submissions — HackSort AI" },
      {
        property: "og:description",
        content: "Filter, sort and compare the full hackathon submission pool with explainable AI signals.",
      },
    ],
  }),
  component: AllSubmissions,
});

function AllSubmissions() {
  const [search, setSearch] = useState("");
  return (
    <AppShell role="judge" search={search} onSearchChange={setSearch}>
      <SectionHeading
        title="All submissions"
        subtitle="500 submissions, all analyzed. Sort by similarity, innovation signal, impact, priority or presentation quality."
      />
      <SubmissionExplorer submissions={SUBMISSIONS} search={search} onSearchChange={setSearch} defaultView="table" />
      <div className="mt-4">
        <AiNote />
      </div>
    </AppShell>
  );
}
