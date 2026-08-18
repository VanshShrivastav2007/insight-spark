import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/queue")({
  component: Page,
});

function Page() {
  return <div />;
}
