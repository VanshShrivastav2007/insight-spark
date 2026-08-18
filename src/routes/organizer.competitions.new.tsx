import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organizer/competitions/new")({
  component: Page,
});

function Page() {
  return <div />;
}
