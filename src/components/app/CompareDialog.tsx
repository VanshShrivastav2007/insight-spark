import type { Submission } from "@/lib/demo-data";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { AiNote } from "./primitives";
import { cn } from "@/lib/utils";

const ROWS: { label: string; get: (s: Submission) => string | number; numeric?: boolean }[] = [
  { label: "Category", get: (s) => s.category },
  { label: "Problem area", get: (s) => s.problemArea },
  { label: "Problem", get: (s) => s.problem },
  { label: "Target user", get: (s) => s.targetUser },
  { label: "Solution", get: (s) => s.solution },
  { label: "Technology", get: (s) => s.technology },
  { label: "Prototype", get: (s) => s.prototype },
  { label: "Innovation Signal", get: (s) => s.scores.innovationSignal, numeric: true },
  { label: "Similarity", get: (s) => s.scores.similarity, numeric: true },
  { label: "Impact", get: (s) => s.scores.impact, numeric: true },
  { label: "Feasibility", get: (s) => s.scores.feasibility, numeric: true },
  { label: "Presentation Quality", get: (s) => s.scores.presentationQuality, numeric: true },
  { label: "Strengths", get: (s) => s.strengths.slice(0, 2).join(" · ") },
  { label: "Concerns", get: (s) => s.concerns.slice(0, 2).join(" · ") },
];

function summary(items: Submission[]) {
  if (items.length < 2) return "";
  const [a, b] = items;
  const sameArea = items.every((s) => s.problemArea === items[0]!.problemArea);
  const diffGap = Math.abs(a!.scores.solutionDifferentiation - b!.scores.solutionDifferentiation);
  const presGap = Math.abs(a!.scores.presentationQuality - b!.scores.presentationQuality);
  return [
    sameArea
      ? `${a!.team} and ${b!.team} address the same problem area (${a!.problemArea})`
      : `${a!.team} and ${b!.team} address different problem areas (${a!.problemArea} vs ${b!.problemArea})`,
    diffGap >= 20
      ? `, but the technical approaches differ substantially — ${(a!.scores.solutionDifferentiation > b!.scores.solutionDifferentiation ? a! : b!).team} departs from the dominant pattern in this cluster.`
      : ", and both follow broadly comparable technical approaches.",
    presGap >= 20
      ? ` Presentation quality differs by ${presGap} points, so raw deck impressions are not comparable to project signals here.`
      : "",
  ].join("");
}

export function CompareDialog({
  items,
  open,
  onOpenChange,
}: {
  items: Submission[];
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-6xl overflow-auto">
        <DialogTitle>Side-by-side comparison</DialogTitle>
        <DialogDescription className="text-xs">
          Comparing {items.length} submissions. Meaningful differences are highlighted.
        </DialogDescription>

        <div className="rounded-xl border border-primary/20 bg-accent p-4 text-sm text-accent-foreground">
          <p className="font-semibold">AI comparison summary</p>
          <p className="mt-1 leading-relaxed">{summary(items)}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-40 border-b border-border p-3 text-left text-xs uppercase tracking-wide text-muted-foreground">
                  Attribute
                </th>
                {items.map((s) => (
                  <th key={s.id} className="border-b border-border p-3 text-left">
                    <span className="block font-semibold">{s.team}</span>
                    <span className="block text-xs font-normal text-muted-foreground">{s.project}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => {
                const values = items.map((s) => row.get(s));
                const nums = row.numeric ? (values as number[]) : [];
                const max = row.numeric ? Math.max(...nums) : 0;
                const meaningful = row.numeric && Math.max(...nums) - Math.min(...nums) >= 15;
                return (
                  <tr key={row.label} className="align-top">
                    <th scope="row" className="border-b border-border p-3 text-left text-xs font-semibold text-muted-foreground">
                      {row.label}
                    </th>
                    {values.map((v, i) => (
                      <td
                        key={i}
                        className={cn(
                          "border-b border-border p-3 text-xs",
                          row.numeric && "text-sm font-semibold tabular-nums",
                          meaningful && v === max && "text-success",
                          meaningful && v !== max && "text-muted-foreground",
                        )}
                      >
                        {v}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <AiNote>
          AI comparison is advisory and derived from the submitted material. Verify against the original submissions
          before making a decision.
        </AiNote>
      </DialogContent>
    </Dialog>
  );
}
