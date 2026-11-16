import { sidebarLinks } from "@/constants";
import { SignOutButton } from "@clerk/react";
import { Link, useLocation } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="p-3 flex flex-col justify-between items-center bg-gray-100">
      <div className="flex flex-col gap-5">
        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-rose-100 via-indigo-300 to-sky-600" />
        <div className="flex flex-col items-center gap-3">
          {sidebarLinks.map((link) => (
            <Link
              to={link.href}
              key={link.id}
              className={cn(
                "rounded-full p-2 cursor-pointer flex items-center gap-2",
                location.pathname === link.href
                  ? "bg-gray-500 text-gray-100"
                  : "bg-gray-200",
              )}
            >
              <link.icon size={14} />
              <span className="hidden">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
      <SignOutButton>
        <div className="rounded-full bg-rose-500 border-rose-500 text-rose-50 p-2 cursor-pointer flex items-center gap-2">
          <LogOut size={14} />
          <p className="hidden">Sign Out</p>
        </div>
      </SignOutButton>
    </aside>
  );
}
