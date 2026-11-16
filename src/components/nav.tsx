import { Search, SidebarOpen } from "lucide-react";

export default function Nav() {
  return (
    <div className="w-full h-12 flex justify-between items-center px-3">
      <button className="p-2!">
        <SidebarOpen size={14} />
      </button>
      <button className="p-2!">
        <Search size={14} />
      </button>
    </div>
  );
}
