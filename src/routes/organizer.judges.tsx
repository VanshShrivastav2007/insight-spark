import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organizer/judges")({
  component: Page,
});

function Page() {
  return <div />;
}
