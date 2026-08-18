import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/demo")({
  component: Page,
});

function Page() {
  return <div />;
}
