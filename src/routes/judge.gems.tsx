import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/gems")({
  component: Page,
});

function Page() {
  return <div />;
}
