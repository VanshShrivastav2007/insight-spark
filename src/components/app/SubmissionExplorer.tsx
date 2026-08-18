import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { GitCompare, LayoutGrid, Rows3, SearchX, SlidersHorizontal, X } from "lucide-react";
import { CATEGORIES, PROBLEM_AREAS, type Category, type Submission } from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SubmissionCard } from "./SubmissionCard";
import { CompareDialog } from "./CompareDialog";
import { EmptyState, GemBadge, PriorityBadge, TagBadge } from "./primitives";
import { cn } from "@/lib/utils";

type SortKey = "priority" | "innovation" | "similarity" | "impact" | "presentation";

const SORTS: { key: SortKey; label: string }[] = [
  { key: "priority", label: "Priority" },
  { key: "innovation", label: "Innovation Signal" },
  { key: "similarity", label: "Similarity" },
  { key: "impact", label: "Impact" },
  { key: "presentation", label: "Presentation Quality" },
];

export function SubmissionExplorer({
  submissions,
  search,
  onSearchChange,
  defaultCategory = "all",
  defaultView = "grid",
  title,
}: {
  submissions: Submission[];
  search: string;
  onSearchChange: (v: string) => void;
  defaultCategory?: Category | "all";
  defaultView?: "grid" | "table";
  title?: string;
}) {
  const [category, setCategory] = useState<Category | "all">(defaultCategory);
  const [area, setArea] = useState<string>("all");
  const [priority, setPriority] = useState<string>("all");
  const [minSignal, setMinSignal] = useState(0);
  const [maxSimilarity, setMaxSimilarity] = useState(100);
  const [maxPresentation, setMaxPresentation] = useState(100);
  const [sort, setSort] = useState<SortKey>("priority");
  const [view, setView] = useState<"grid" | "table">(defaultView);
  const [selected, setSelected] = useState<string[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const areas = useMemo(
    () => PROBLEM_AREAS.filter((p) => category === "all" || p.category === category).map((p) => p.area),
    [category],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const priorityRank = { "High Priority": 0, Review: 1, Standard: 2 } as const;
    return submissions
      .filter((s) => (category === "all" || s.category === category))
      .filter((s) => area === "all" || s.problemArea === area)
      .filter((s) => priority === "all" || (priority === "gem" ? s.hiddenGem : s.priority === priority))
      .filter((s) => s.scores.innovationSignal >= minSignal)
      .filter((s) => s.scores.similarity <= maxSimilarity)
      .filter((s) => s.scores.presentationQuality <= maxPresentation)
      .filter(
        (s) =>
          !q ||
          s.team.toLowerCase().includes(q) ||
          s.project.toLowerCase().includes(q) ||
          s.problemArea.toLowerCase().includes(q) ||
          s.problem.toLowerCase().includes(q),
      )
      .sort((a, b) => {
        switch (sort) {
          case "innovation":
            return b.scores.innovationSignal - a.scores.innovationSignal;
          case "similarity":
            return b.scores.similarity - a.scores.similarity;
          case "impact":
            return b.scores.impact - a.scores.impact;
          case "presentation":
            return a.scores.presentationQuality - b.scores.presentationQuality;
          default:
            return (
              priorityRank[a.priority] - priorityRank[b.priority] ||
              b.scores.innovationSignal - a.scores.innovationSignal
            );
        }
      });
  }, [submissions, search, category, area, priority, minSignal, maxSimilarity, maxPresentation, sort]);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : prev.length >= 4 ? prev : [...prev, id]));

  const compareItems = submissions.filter((s) => selected.includes(s.id));
  const shown = filtered.slice(0, 48);

  const reset = () => {
    setCategory("all");
    setArea("all");
    setPriority("all");
    setMinSignal(0);
    setMaxSimilarity(100);
    setMaxPresentation(100);
    onSearchChange("");
  };

  return (
    <div className="space-y-4">
      <div className="card-surface p-4">
        <div className="flex flex-wrap items-center gap-2">
          {title ? <p className="mr-auto text-sm font-semibold">{title}</p> : null}
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search teams, projects or problems..."
            aria-label="Search submissions"
            className="h-9 w-full rounded-lg sm:w-64"
          />
          <Select value={category} onValueChange={(v) => { setCategory(v as Category | "all"); setArea("all"); }}>
            <SelectTrigger className="h-9 w-40" aria-label="Filter by category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={area} onValueChange={setArea}>
            <SelectTrigger className="h-9 w-48" aria-label="Filter by problem area">
              <SelectValue placeholder="Problem area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All problem areas</SelectItem>
              {areas.map((a) => (
                <SelectItem key={a} value={a}>
                  {a}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={priority} onValueChange={setPriority}>
            <SelectTrigger className="h-9 w-44" aria-label="Filter by priority">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All priorities</SelectItem>
              <SelectItem value="High Priority">High Priority</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="gem">Potential Hidden Gem</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="h-9 w-48" aria-label="Sort submissions">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => (
                <SelectItem key={s.key} value={s.key}>
                  Sort by {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => setShowFilters((v) => !v)} aria-expanded={showFilters}>
            <SlidersHorizontal className="size-4" /> Signal filters
          </Button>
          <div className="ml-auto flex items-center gap-1 rounded-lg border border-border p-1">
            <Button
              variant={view === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="size-7"
              onClick={() => setView("grid")}
              aria-label="Card view"
            >
              <LayoutGrid className="size-4" />
            </Button>
            <Button
              variant={view === "table" ? "secondary" : "ghost"}
              size="icon"
              className="size-7"
              onClick={() => setView("table")}
              aria-label="Table view"
            >
              <Rows3 className="size-4" />
            </Button>
          </div>
        </div>

        {showFilters ? (
          <div className="mt-4 grid gap-5 border-t border-border pt-4 sm:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-medium">Minimum Innovation Signal: {minSignal}</p>
              <Slider value={[minSignal]} max={100} step={5} onValueChange={([v]) => setMinSignal(v ?? 0)} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium">Maximum Similarity: {maxSimilarity}</p>
              <Slider value={[maxSimilarity]} max={100} step={5} onValueChange={([v]) => setMaxSimilarity(v ?? 100)} />
            </div>
            <div>
              <p className="mb-2 text-xs font-medium">Maximum Presentation Quality: {maxPresentation}</p>
              <Slider
                value={[maxPresentation]}
                max={100}
                step={5}
                onValueChange={([v]) => setMaxPresentation(v ?? 100)}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <span>
            Showing <strong className="text-foreground">{shown.length}</strong> of {filtered.length} matching submissions
          </span>
          {selected.length > 0 ? (
            <>
              <Button size="sm" onClick={() => setCompareOpen(true)} disabled={selected.length < 2}>
                <GitCompare className="size-4" /> Compare {selected.length} selected
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setSelected([])}>
                <X className="size-4" /> Clear
              </Button>
            </>
          ) : (
            <span>Select 2-4 submissions to compare side by side.</span>
          )}
          <Button variant="ghost" size="sm" className="ml-auto" onClick={reset}>
            Reset filters
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<SearchX className="size-5" />}
          title="No submissions match these filters"
          description="Nothing in the pool matches this combination of category, problem area and signal thresholds. Try widening the similarity or presentation range."
          action={
            <Button variant="outline" onClick={reset}>
              Reset filters
            </Button>
          }
        />
      ) : view === "grid" ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shown.map((s) => (
            <SubmissionCard key={s.id} submission={s} selected={selected.includes(s.id)} onToggleCompare={toggle} />
          ))}
        </div>
      ) : (
        <div className="card-surface overflow-x-auto">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-secondary/60 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="p-3 text-left">Team / project</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-right">Signal</th>
                <th className="p-3 text-right">Similarity</th>
                <th className="p-3 text-right">Impact</th>
                <th className="p-3 text-right">Presentation</th>
                <th className="p-3 text-left">Priority</th>
                <th className="p-3" />
              </tr>
            </thead>
            <tbody>
              {shown.map((s) => (
                <tr key={s.id} className="border-t border-border transition-colors hover:bg-secondary/40">
                  <td className="p-3">
                    <Link
                      to="/judge/submissions/$id"
                      params={{ id: s.id }}
                      className="font-semibold hover:text-primary hover:underline"
                    >
                      {s.team}
                    </Link>
                    <span className="block text-xs text-muted-foreground">{s.project}</span>
                    {s.hiddenGem ? <GemBadge className="mt-1" /> : null}
                  </td>
                  <td className="p-3">
                    <TagBadge>{s.problemArea}</TagBadge>
                  </td>
                  <td className={cn("p-3 text-right font-semibold tabular-nums", s.scores.innovationSignal >= 80 && "text-success")}>
                    {s.scores.innovationSignal}
                  </td>
                  <td className="p-3 text-right tabular-nums">{s.scores.similarity}</td>
                  <td className="p-3 text-right tabular-nums">{s.scores.impact}</td>
                  <td className={cn("p-3 text-right tabular-nums", s.scores.presentationQuality < 55 && "text-chart-7")}>
                    {s.scores.presentationQuality}
                  </td>
                  <td className="p-3">
                    <PriorityBadge priority={s.priority} />
                  </td>
                  <td className="p-3 text-right">
                    <Button variant="outline" size="sm" onClick={() => toggle(s.id)} aria-pressed={selected.includes(s.id)}>
                      {selected.includes(s.id) ? "Selected" : "Compare"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {compareItems.length >= 2 ? (
        <CompareDialog items={compareItems} open={compareOpen} onOpenChange={setCompareOpen} />
      ) : null}
    </div>
  );
}
