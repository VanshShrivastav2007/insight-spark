import { toast } from "sonner";
import { Check, RotateCcw, X } from "lucide-react";
import type { Submission } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { useDecisions } from "@/lib/decision-store";
import { AiRecommendationTag } from "./GemEvidence";

export function DecisionPanel({ submission }: { submission: Submission }) {
  const { decisions, setDecision } = useDecisions();
  const current = decisions[submission.id]?.decision;

  return (
    <section className="card-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold">Your decision</h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Shortlist or reject this submission. Stored against your judge account only.
          </p>
        </div>
        {current ? (
          <span
            className={
              current === "shortlisted"
                ? "rounded-full border border-success/40 bg-success/12 px-2.5 py-1 text-[11px] font-semibold text-success"
                : "rounded-full border border-destructive/40 bg-destructive/12 px-2.5 py-1 text-[11px] font-semibold text-destructive"
            }
          >
            {current === "shortlisted" ? "Shortlisted" : "Rejected"}
          </span>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          onClick={() => {
            setDecision(submission.id, submission.team, "shortlisted");
            toast.success(`${submission.team} shortlisted`);
          }}
        >
          <Check className="size-4" /> Shortlist
        </Button>
        <Button
          variant="outline"
          className="border-destructive/40 text-destructive hover:bg-destructive/10"
          onClick={() => {
            setDecision(submission.id, submission.team, "rejected");
            toast.success(`${submission.team} rejected`);
          }}
        >
          <X className="size-4" /> Reject
        </Button>
        {current ? (
          <Button
            variant="ghost"
            onClick={() => {
              setDecision(submission.id, submission.team, null);
              toast.info("Decision cleared");
            }}
          >
            <RotateCcw className="size-4" /> Clear
          </Button>
        ) : null}
      </div>
      <div className="mt-4">
        <AiRecommendationTag />
      </div>
    </section>
  );
}
