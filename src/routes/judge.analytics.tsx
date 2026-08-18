import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/analytics")({
  component: Page,
});

function Page() {
  return <div />;
}
