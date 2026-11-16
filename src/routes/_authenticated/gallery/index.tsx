import PageHeader from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/gallery/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="py-10">
      <PageHeader title="Gallery" />
    </div>
  );
}
