import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/participant/")({
  component: Page,
});

function Page() {
  return <div />;
}
