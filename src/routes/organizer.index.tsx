import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/organizer/")({
  component: Page,
});

function Page() {
  return <div />;
}
