import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organizer/submissions")({
  component: Page,
});

function Page() {
  return <div />;
}
