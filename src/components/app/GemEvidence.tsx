import { Gem, Scale, Sparkles } from "lucide-react";
import type { Submission } from "@/lib/demo-data";
import { cn } from "@/lib/utils";

/** Explainable evidence for why AI flagged a submission as a potential hidden gem. */
export function gemEvidence(s: Submission): string[] {
  const evidence: string[] = [];
  evidence.push(
    `Innovation signal ${s.scores.innovationSignal}/100 — solution differentiation ${s.scores.solutionDifferentiation}, technical differentiation ${s.scores.technicalDifferentiation}.`,
  );
  evidence.push(
    `Impact score ${s.scores.impact}/100 based on the stated beneficiary: ${s.targetUser.toLowerCase()}.`,
  );
  evidence.push(
    `Presentation quality only ${s.scores.presentationQuality}/100 (clarity ${s.scores.clarity}, structure ${s.scores.structure}, visuals ${s.scores.visualQuality}) — the gap between substance and delivery is ${Math.max(
      0,
      Math.round((s.scores.innovationSignal + s.scores.impact) / 2 - s.scores.presentationQuality),
    )} points.`,
  );
  evidence.push(
    s.similar[0]
      ? `Closest submission in ${s.problemArea} is ${s.similar[0].similarity}% similar; key difference: ${s.similar[0].keyDifference}`
      : `No submission in ${s.problemArea} passes the similarity threshold — approach departs from the dominant pattern.`,
  );
  evidence.push(`${s.prototype} submitted, feasibility ${s.scores.feasibility}/100.`);
  return [...s.whyHighlighted, ...evidence];
}

export function isPotentialGem(s: Submission) {
  return (
    s.hiddenGem ||
    (s.scores.innovationSignal >= 72 && s.scores.impact >= 70 && s.scores.presentationQuality <= 62)
  );
}

export function GemEvidencePanel({ submission, className }: { submission: Submission; className?: string }) {
  return (
    <section className={cn("card-surface p-5", className)}>
      <h2 className="flex items-center gap-2 text-sm font-semibold">
        <Gem className="size-4 text-gem" /> Why AI highlighted this submission
      </h2>
      <ul className="mt-3 space-y-2">
        {gemEvidence(submission).map((e) => (
          <li key={e} className="flex gap-2.5 rounded-xl border border-border bg-muted/40 p-3 text-xs leading-relaxed">
            <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
            <span className="text-muted-foreground">{e}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold">
        <Scale className="size-3.5 text-primary" /> AI Recommendation — Judge decides.
      </p>
    </section>
  );
}

export function AiRecommendationTag({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold",
        className,
      )}
    >
      <Scale className="size-3" /> AI Recommendation — Judge decides
    </span>
  );
}
