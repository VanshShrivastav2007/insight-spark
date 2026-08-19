import { useCallback, useEffect, useState } from "react";

export interface JudgeAccount {
  id: string;
  name: string;
  email: string;
  initials: string;
  affiliation: string;
  competitionIds: string[];
}

export interface Competition {
  id: string;
  name: string;
  organizer: string;
  window: string;
  submissions: number;
  assigned: number;
  completed: number;
  status: "Judging open" | "Submissions open" | "Completed";
  tracks: string[];
}

export const COMPETITIONS: Competition[] = [
  {
    id: "spring-2026",
    name: "Spring Hackathon 2026",
    organizer: "HackSort Foundation",
    window: "Mar 01 – Mar 19, 2026",
    submissions: 500,
    assigned: 140,
    completed: 128,
    status: "Judging open",
    tracks: ["Agriculture", "Healthcare", "Education", "Climate", "FinTech", "Accessibility", "Smart City", "Logistics"],
  },
  {
    id: "climate-jam",
    name: "Climate Resilience Jam",
    organizer: "GreenGrid Alliance",
    window: "Apr 04 – Apr 20, 2026",
    submissions: 87,
    assigned: 32,
    completed: 4,
    status: "Submissions open",
    tracks: ["Climate", "Agriculture", "Smart City"],
  },
  {
    id: "healthtech-2025",
    name: "Campus HealthTech Challenge 2025",
    organizer: "Medlytic Labs",
    window: "Oct 12 – Oct 28, 2025",
    submissions: 214,
    assigned: 60,
    completed: 60,
    status: "Completed",
    tracks: ["Healthcare", "Accessibility"],
  },
];

/** Multiple judges share a competition, each with their own account. */
export const JUDGE_ACCOUNTS: JudgeAccount[] = [
  {
    id: "judge-1",
    name: "Dr. Anita Rao",
    email: "anita.rao@hacksort.ai",
    initials: "AR",
    affiliation: "Professor, Agricultural Systems",
    competitionIds: ["spring-2026", "climate-jam"],
  },
  {
    id: "judge-2",
    name: "Vikram Shetty",
    email: "vikram.shetty@hacksort.ai",
    initials: "VS",
    affiliation: "Partner, Northbridge Ventures",
    competitionIds: ["spring-2026"],
  },
  {
    id: "judge-3",
    name: "Priya Nair",
    email: "priya.nair@hacksort.ai",
    initials: "PN",
    affiliation: "Director of Product, Medlytic",
    competitionIds: ["spring-2026", "healthtech-2025"],
  },
  {
    id: "judge-4",
    name: "Rahul Menon",
    email: "rahul.menon@hacksort.ai",
    initials: "RM",
    affiliation: "Head of Engineering, Civicstack",
    competitionIds: ["spring-2026", "climate-jam", "healthtech-2025"],
  },
];

export const DEMO_PASSWORD = "hacksort";
export const INVITE_CODES: Record<string, string> = {
  "SPRING-2026": "spring-2026",
  "CLIMATE-JAM": "climate-jam",
};

export interface JudgeSession {
  judgeId: string;
  email: string;
  competitionId: string | null;
  remember: boolean;
  extraCompetitionIds: string[];
  signedInAt: string;
}

const KEY = "hacksort.judge.session.v1";
const listeners = new Set<() => void>();

function read(): JudgeSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY) ?? window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as JudgeSession) : null;
  } catch {
    return null;
  }
}

function write(session: JudgeSession | null) {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(KEY);
    window.sessionStorage.removeItem(KEY);
    if (session) {
      const store = session.remember ? window.localStorage : window.sessionStorage;
      store.setItem(KEY, JSON.stringify(session));
    }
  }
  listeners.forEach((l) => l());
}

export function findJudgeByEmail(email: string) {
  const q = email.trim().toLowerCase();
  return JUDGE_ACCOUNTS.find((j) => j.email.toLowerCase() === q);
}

export function getCompetition(id: string | null | undefined) {
  return COMPETITIONS.find((c) => c.id === id);
}

export function judgeCompetitions(session: JudgeSession | null) {
  if (!session) return [];
  const judge = JUDGE_ACCOUNTS.find((j) => j.id === session.judgeId);
  const ids = new Set([...(judge?.competitionIds ?? []), ...session.extraCompetitionIds]);
  return COMPETITIONS.filter((c) => ids.has(c.id));
}

export function signIn(judge: JudgeAccount, remember: boolean): JudgeSession {
  const session: JudgeSession = {
    judgeId: judge.id,
    email: judge.email,
    competitionId: null,
    remember,
    extraCompetitionIds: [],
    signedInAt: new Date().toISOString(),
  };
  write(session);
  return session;
}

export function signOut() {
  write(null);
}

export function selectCompetition(competitionId: string) {
  const current = read();
  if (!current) return;
  write({ ...current, competitionId });
}

export function redeemInviteCode(code: string): { ok: boolean; competitionId?: string } {
  const id = INVITE_CODES[code.trim().toUpperCase()];
  if (!id) return { ok: false };
  const current = read();
  if (current && !current.extraCompetitionIds.includes(id)) {
    write({ ...current, extraCompetitionIds: [...current.extraCompetitionIds, id] });
  }
  return { ok: true, competitionId: id };
}

export function useJudgeSession() {
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<JudgeSession | null>(null);

  useEffect(() => {
    const sync = () => setSession(read());
    sync();
    setHydrated(true);
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  const judge = session ? JUDGE_ACCOUNTS.find((j) => j.id === session.judgeId) : undefined;

  return {
    hydrated,
    session,
    judge,
    competition: getCompetition(session?.competitionId),
    competitions: judgeCompetitions(session),
    signIn: useCallback((j: JudgeAccount, remember: boolean) => signIn(j, remember), []),
    signOut: useCallback(() => signOut(), []),
    selectCompetition: useCallback((id: string) => selectCompetition(id), []),
    redeemInviteCode: useCallback((code: string) => redeemInviteCode(code), []),
  };
}
