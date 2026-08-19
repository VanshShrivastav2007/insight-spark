import { useEffect } from "react";
import { createFileRoute, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useJudgeSession } from "@/lib/judge-auth";

export const Route = createFileRoute("/judge")({
  component: JudgeLayout,
});

function JudgeLayout() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { hydrated, session } = useJudgeSession();
  const onCompetitionPicker = pathname.startsWith("/judge/competitions");

  useEffect(() => {
    if (!hydrated) return;
    if (!session) {
      navigate({ to: "/login", replace: true });
      return;
    }
    if (!session.competitionId && !onCompetitionPicker) {
      navigate({ to: "/judge/competitions", replace: true });
    }
  }, [hydrated, session, onCompetitionPicker, navigate]);

  const ready = hydrated && session && (session.competitionId || onCompetitionPicker);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft-gradient">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Preparing your judge workspace...
        </p>
      </div>
    );
  }

  return <Outlet />;
}
