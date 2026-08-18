import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/evaluations")({
  component: Page,
});

function Page() {
  return <div />;
}
