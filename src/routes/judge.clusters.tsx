import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/clusters")({
  component: Page,
});

function Page() {
  return <div />;
}
