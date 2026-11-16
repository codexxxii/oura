import PageHeader from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="py-10">
      <PageHeader title="Home" />
    </div>
  );
}
