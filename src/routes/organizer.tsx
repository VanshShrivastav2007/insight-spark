import { useEffect } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useOrganizerSession } from "@/lib/organizer-auth";

export const Route = createFileRoute("/organizer")({
  component: OrganizerLayout,
});

function OrganizerLayout() {
  const navigate = useNavigate();
  const { hydrated, session } = useOrganizerSession();

  useEffect(() => {
    if (!hydrated) return;
    if (!session) navigate({ to: "/organizer-login", replace: true });
  }, [hydrated, session, navigate]);

  if (!hydrated || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soft-gradient">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Preparing your organizer workspace...
        </p>
      </div>
    );
  }

  return <Outlet />;
}
