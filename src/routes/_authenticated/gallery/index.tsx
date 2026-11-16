import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/gallery/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/gallery/"!</div>;
}
