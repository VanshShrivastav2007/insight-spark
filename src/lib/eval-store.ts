import { useCallback, useEffect, useState } from "react";

export interface Evaluation {
  submissionId: string;
  team: string;
  problemRelevance: number;
  innovation: number;
  impact: number;
  feasibility: number;
  prototype: number;
  presentation: number;
  comments: string;
  status: "draft" | "submitted";
  updatedAt: string;
}

const KEY = "hacksort.evaluations.v1";
const listeners = new Set<() => void>();

function read(): Record<string, Evaluation> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Record<string, Evaluation>;
  } catch {
    return {};
  }
}

function write(map: Record<string, Evaluation>) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(map));
  listeners.forEach((l) => l());
}

export function saveEvaluation(evaluation: Evaluation) {
  const map = read();
  map[evaluation.submissionId] = evaluation;
  write(map);
}

export function averageOf(e: Evaluation) {
  return Number(
    ((e.problemRelevance + e.innovation + e.impact + e.feasibility + e.prototype + e.presentation) / 6).toFixed(1),
  );
}

export function useEvaluations() {
  const [map, setMap] = useState<Record<string, Evaluation>>({});
  useEffect(() => {
    const sync = () => setMap(read());
    sync();
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);
  const save = useCallback((e: Evaluation) => saveEvaluation(e), []);
  return { evaluations: map, save };
}
