import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organizer/settings")({
  component: Page,
});

function Page() {
  return <div />;
}
