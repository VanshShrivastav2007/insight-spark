import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organizer/analytics")({
  component: Page,
});

function Page() {
  return <div />;
}
