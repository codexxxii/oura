import CraeteFolderButton from "@/components/create-folder-button";
import Folders from "@/components/folders";
import PageHeader from "@/components/page-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/folders/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="py-10">
      <PageHeader title="Folders" button={<CraeteFolderButton />} />
      <Folders />
    </div>
  );
}
