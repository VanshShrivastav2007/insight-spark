import { useCallback, useEffect, useState } from "react";

export type Decision = "shortlisted" | "rejected";

export interface DecisionRecord {
  submissionId: string;
  team: string;
  decision: Decision;
  decidedAt: string;
}

const KEY = "hacksort.decisions.v1";
const listeners = new Set<() => void>();

function read(): Record<string, DecisionRecord> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "{}") as Record<string, DecisionRecord>;
  } catch {
    return {};
  }
}

function write(map: Record<string, DecisionRecord>) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, JSON.stringify(map));
  listeners.forEach((l) => l());
}

export function setDecision(submissionId: string, team: string, decision: Decision | null) {
  const map = read();
  if (decision === null) delete map[submissionId];
  else map[submissionId] = { submissionId, team, decision, decidedAt: new Date().toISOString() };
  write(map);
}

export function useDecisions() {
  const [map, setMap] = useState<Record<string, DecisionRecord>>({});
  useEffect(() => {
    const sync = () => setMap(read());
    sync();
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);
  return {
    decisions: map,
    setDecision: useCallback(
      (id: string, team: string, decision: Decision | null) => setDecision(id, team, decision),
      [],
    ),
  };
}
