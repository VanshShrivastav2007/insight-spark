import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/judge/submissions/$id")({
  component: Page,
});

function Page() {
  return <div />;
}
