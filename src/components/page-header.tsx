import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

type Filter = {
  label: string;
  value: string;
};

interface PageHeaderProps {
  title: string;
  description?: string;
  filters?: Filter[];
  onFilterChange?: (filter: string) => void;
  button?: React.ReactNode;
}

export default function PageHeader({
  title,
  description,
  filters = [],
  onFilterChange,
  button,
}: PageHeaderProps) {
  const [activeFilter, setActiveFilter] = useState(filters[0]?.value ?? "all");

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  return (
    <div className="w-full bg-white py-6">
      {/* Title + Upload */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tighter text-gray-900">
            {title}
          </h1>

          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>

        {button}
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div className="mt-7 flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-1 overflow-x-auto">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => handleFilterChange(filter.value)}
                  aria-pressed={isActive}
                  className={cn(
                    "shrink-0 cursor-pointer rounded-full px-4 py-2 text-xs font-medium transition-all duration-200",
                    isActive
                      ? "bg-blue-500 text-white shadow-sm shadow-blue-500/20"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  {filter.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="More filters"
            className="flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900"
          >
            <SlidersHorizontal size={16} strokeWidth={1.8} />
          </button>
        </div>
      )}
    </div>
  );
}
