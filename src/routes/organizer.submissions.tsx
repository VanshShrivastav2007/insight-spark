import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";
import { AiNote, SectionHeading, StatCard } from "@/components/app/primitives";
import { SubmissionExplorer } from "@/components/app/SubmissionExplorer";
import { HIDDEN_GEMS, STATS, SUBMISSIONS } from "@/lib/demo-data";

export const Route = createFileRoute("/organizer/submissions")({
  head: () => ({
    meta: [
      { title: "Submission pool — HackSort AI" },
      {
        name: "description",
        content:
          "The full 500-submission pool with analysis status, category and problem-area filters, and export-ready views for organizers.",
      },
      { property: "og:title", content: "Submission pool — HackSort AI" },
      {
        property: "og:description",
        content: "Track intake, analysis status and distribution across the whole submission pool.",
      },
    ],
  }),
  component: OrganizerSubmissions,
});

function OrganizerSubmissions() {
  const [search, setSearch] = useState("");
  const working = SUBMISSIONS.filter((s) => s.prototype === "Working prototype").length;

  return (
    <AppShell role="organizer" search={search} onSearchChange={setSearch}>
      <SectionHeading
        title="Submission pool"
        subtitle="Every submission has completed AI analysis. Organizers see the same signals judges see, plus intake status."
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total" value={STATS.total} />
        <StatCard label="Analyzed" value={STATS.analyzed} tone="success" />
        <StatCard label="Working prototypes" value={working} />
        <StatCard label="Potential hidden gems" value={HIDDEN_GEMS.length} tone="gem" />
      </div>

      <SubmissionExplorer submissions={SUBMISSIONS} search={search} onSearchChange={setSearch} defaultView="table" />
      <div className="mt-4">
        <AiNote />
      </div>
    </AppShell>
  );
}
