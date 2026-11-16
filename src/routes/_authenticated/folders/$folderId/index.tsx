import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/folders/$folderId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/folders/$folderId/"!</div>;
}
