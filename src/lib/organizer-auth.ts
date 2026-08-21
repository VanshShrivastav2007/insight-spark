import { useCallback, useEffect, useState } from "react";

export interface OrganizerAccount {
  id: string;
  name: string;
  email: string;
  initials: string;
  affiliation: string;
}

export const ORGANIZER_ACCOUNTS: OrganizerAccount[] = [
  {
    id: "org-1",
    name: "Meera Krishnan",
    email: "meera@hacksort.ai",
    initials: "MK",
    affiliation: "Program Lead, HackSort Foundation",
  },
  {
    id: "org-2",
    name: "Dev Sharma",
    email: "dev@hacksort.ai",
    initials: "DS",
    affiliation: "Operations, GreenGrid Alliance",
  },
];

export const ORGANIZER_DEMO_PASSWORD = "hacksort";

export interface OrganizerSession {
  organizerId: string;
  email: string;
  remember: boolean;
  signedInAt: string;
}

const KEY = "hacksort.organizer.session.v1";
const listeners = new Set<() => void>();

function read(): OrganizerSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY) ?? window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as OrganizerSession) : null;
  } catch {
    return null;
  }
}

function write(session: OrganizerSession | null) {
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

export function findOrganizerByEmail(email: string) {
  const q = email.trim().toLowerCase();
  return ORGANIZER_ACCOUNTS.find((o) => o.email.toLowerCase() === q);
}

export function organizerSignIn(account: OrganizerAccount, remember: boolean): OrganizerSession {
  const session: OrganizerSession = {
    organizerId: account.id,
    email: account.email,
    remember,
    signedInAt: new Date().toISOString(),
  };
  write(session);
  return session;
}

export function organizerSignOut() {
  write(null);
}

export function useOrganizerSession() {
  const [hydrated, setHydrated] = useState(false);
  const [session, setSession] = useState<OrganizerSession | null>(null);

  useEffect(() => {
    const sync = () => setSession(read());
    sync();
    setHydrated(true);
    listeners.add(sync);
    return () => {
      listeners.delete(sync);
    };
  }, []);

  return {
    hydrated,
    session,
    organizer: session ? ORGANIZER_ACCOUNTS.find((o) => o.id === session.organizerId) : undefined,
    signIn: useCallback((a: OrganizerAccount, remember: boolean) => organizerSignIn(a, remember), []),
    signOut: useCallback(() => organizerSignOut(), []),
  };
}
