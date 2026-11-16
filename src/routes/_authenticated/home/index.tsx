import Breadcrumbs from "@/components/breadcrumbs";
import { createFileRoute } from "@tanstack/react-router";
import { Upload } from "lucide-react";

export const Route = createFileRoute("/_authenticated/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="py-10">
      <div className="w-full flex justify-between items-center">
        <div className="space-y-1">
          <Breadcrumbs pages={["Home"]} />
          <p className="text-4xl font-semibold tracking-tighter">Home</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-500 border-blue-500 text-white">
          <Upload size={15} />
          <span>Upload</span>
        </button>
      </div>
    </div>
  );
}
