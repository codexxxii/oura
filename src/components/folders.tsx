import { useQuery } from "convex/react";
import { FolderIcon, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "../../convex/_generated/api";
import { Link } from "@tanstack/react-router";
import type { Doc } from "../../convex/_generated/dataModel";

interface FolderProps {
  folder: Doc<"folders">;
}

export default function Folders() {
  const folders = useQuery(api.folders.getFolders);

  // Loading
  if (folders === undefined) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-25 animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  // Empty state
  if (folders.length === 0) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-8 text-center">
        <div className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-500">
          <FolderOpen size={26} strokeWidth={1.5} />
        </div>

        <h3 className="text-sm font-semibold text-gray-900">No folders yet</h3>

        <p className="mt-1 max-w-xs text-sm text-gray-500">
          Create your first folder to start organizing your files.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {folders.map((folder) => (
        <Folder key={folder._id} folder={folder} />
      ))}
    </div>
  );
}

function Folder({ folder }: FolderProps) {
  const formattedDate = new Date(folder._creationTime).toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <Link
        to="/folders/$folderId"
        params={{ folderId: folder._id }}
        className="flex w-full h-25 items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-gray-200/40"
      >
        {/* Folder Icon */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500 transition-colors group-hover:bg-blue-100">
          <FolderIcon size={23} strokeWidth={1.6} />
        </div>

        {/* Folder Details */}
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-gray-900">
            {folder.name}
          </h3>

          <p className="mt-1 text-xs text-gray-400">Created {formattedDate}</p>
        </div>
      </Link>
    </motion.div>
  );
}
