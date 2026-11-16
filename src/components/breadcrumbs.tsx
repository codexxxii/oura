import { ChevronRight } from "lucide-react";

export default function Breadcrumbs({ pages }: { pages: string[] }) {
  return (
    <div className="flex items-center">
      {pages.map((page, index) => (
        <div key={index} className="flex items-center gap-1">
          {index > 0 && (
            <ChevronRight size={10} className="text-gray-400 ml-1" />
          )}
          <p className="text-xs text-gray-400">{page}</p>
        </div>
      ))}
    </div>
  );
}
