import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/submissions/")({
  component: Page,
});

function Page() {
  return <div />;
}
