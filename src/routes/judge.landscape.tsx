import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/landscape")({
  component: Page,
});

function Page() {
  return <div />;
}
