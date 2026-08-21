import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useJudgeSession } from "@/lib/judge-auth";
import { useOrganizerSession } from "@/lib/organizer-auth";
import { cn } from "@/lib/utils";

type RoleKey = "participant" | "judge" | "organizer";

const ROLES: { key: RoleKey; label: string }[] = [
  { key: "participant", label: "Participant" },
  { key: "judge", label: "Judge" },
  { key: "organizer", label: "Organizer" },
];

/**
 * Small role selector: Participant | Judge | Organizer.
 * Judge and Organizer respect their login flow; participant opens directly.
 */
export function RoleNav({ className }: { className?: string }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { session: judgeSession } = useJudgeSession();
  const { session: organizerSession } = useOrganizerSession();

  const active: RoleKey | null = pathname.startsWith("/judge")
    ? "judge"
    : pathname.startsWith("/organizer")
      ? "organizer"
      : pathname.startsWith("/participant")
        ? "participant"
        : null;

  const go = (role: RoleKey) => {
    if (role === "participant") {
      navigate({ to: "/participant" });
      return;
    }
    if (role === "judge") {
      navigate({ to: judgeSession ? (judgeSession.competitionId ? "/judge" : "/judge/competitions") : "/login" });
      return;
    }
    navigate({ to: organizerSession ? "/organizer" : "/organizer-login" });
  };

  return (
    <div
      role="group"
      aria-label="Select role"
      className={cn(
        "inline-flex items-center gap-1 rounded-xl border border-border bg-card/70 p-1 text-sm font-medium backdrop-blur",
        className,
      )}
    >
      {ROLES.map((r) => (
        <button
          key={r.key}
          type="button"
          onClick={() => go(r.key)}
          aria-current={active === r.key ? "page" : undefined}
          className={cn(
            "rounded-lg px-3 py-1.5 transition-colors",
            active === r.key
              ? "bg-primary text-primary-foreground shadow-soft"
              : "text-muted-foreground hover:bg-secondary hover:text-foreground",
          )}
        >
          {r.label}
        </button>
      ))}
    </div>
  );
}
