import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github, Presentation, GitCompare } from "lucide-react";
import { AppShell } from "@/components/app/AppShell";
import { AiAnalysisPanel } from "@/components/app/AiAnalysisPanel";
import { EvaluationForm } from "@/components/app/EvaluationForm";
import { PptViewer } from "@/components/app/PptViewer";
import { CompareDialog } from "@/components/app/CompareDialog";
import { QualityVsPresentation } from "@/components/app/QualityVsPresentation";
import { GemBadge, PriorityBadge } from "@/components/app/primitives";
import { Button } from "@/components/ui/button";
import { getSubmission, SUBMISSIONS } from "@/lib/demo-data";

export const Route = createFileRoute("/judge/submissions/$id")({
  loader: ({ params }) => {
    const submission = getSubmission(params.id);
    if (!submission) throw notFound();
    return { team: submission.team, project: submission.project, summary: submission.aiSummary };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Submission unavailable — HackSort AI" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.team} — ${loaderData.project} | HackSort AI`;
    const description = loaderData.summary.slice(0, 155);
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: SubmissionDetail,
});

function SubmissionDetail() {
  const { id } = Route.useParams();
  const submission = getSubmission(id)!;
  const [compareOpen, setCompareOpen] = useState(false);
  const compareWith = submission.similar[0] ? getSubmission(submission.similar[0].id) : undefined;
  const compareItems = compareWith ? [submission, compareWith] : [submission];

  return (
    <AppShell role="judge">
      <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2">
        <Link to="/judge/queue">
          <ArrowLeft className="size-4" /> Back to queue
        </Link>
      </Button>

      <header className="card-surface p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">{submission.team}</h1>
              <PriorityBadge priority={submission.priority} />
              {submission.hiddenGem ? <GemBadge /> : null}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{submission.project}</p>
            <p className="mt-1 text-xs text-muted-foreground">
              {submission.id} · {submission.category} · {submission.problemArea} · {submission.college} · submitted{" "}
              {submission.submittedAt}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <PptViewer
              team={submission.team}
              trigger={
                <Button variant="outline" size="sm">
                  <Presentation className="size-4" /> View original deck
                </Button>
              }
            />
            <Button asChild variant="outline" size="sm">
              <a href={submission.demoUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="size-4" /> Demo
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href={submission.githubUrl} target="_blank" rel="noreferrer">
                <Github className="size-4" /> Repository
              </a>
            </Button>
            {compareWith ? (
              <Button size="sm" onClick={() => setCompareOpen(true)}>
                <GitCompare className="size-4" /> Compare with {compareWith.team}
              </Button>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_380px]">
        <div className="space-y-4">
          <AiAnalysisPanel submission={submission} />
          <QualityVsPresentation submission={submission} />
        </div>
        <div className="space-y-4">
          <EvaluationForm submission={submission} />
          <section className="card-surface p-5">
            <h2 className="text-sm font-semibold">Similar submissions</h2>
            <ul className="mt-3 space-y-2">
              {submission.similar.map((s) => (
                <li key={s.id} className="rounded-xl border border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold">{s.team}</p>
                    <span className="text-xs font-semibold text-muted-foreground">{s.similarity}%</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{s.keyDifference}</p>
                  <Button asChild variant="link" size="sm" className="mt-1 h-auto p-0">
                    <Link to="/judge/submissions/$id" params={{ id: s.id }}>
                      Open
                    </Link>
                  </Button>
                </li>
              ))}
              {submission.similar.length === 0 ? (
                <li className="text-xs text-muted-foreground">
                  No submission in this competition exceeds the similarity threshold.
                </li>
              ) : null}
            </ul>
          </section>
        </div>
      </div>

      <CompareDialog items={compareItems} open={compareOpen} onOpenChange={setCompareOpen} />
      <p className="mt-6 text-xs text-muted-foreground">
        Showing 1 of {SUBMISSIONS.length} analyzed submissions. HackSort AI supports judging decisions; it does not make
        them.
      </p>
    </AppShell>
  );
}
