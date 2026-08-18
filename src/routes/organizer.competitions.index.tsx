import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organizer/competitions/")({
  component: Page,
});

function Page() {
  return <div />;
}
