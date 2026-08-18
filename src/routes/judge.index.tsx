import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/")({
  component: Page,
});

function Page() {
  return <div />;
}
