import { sidebarLinks } from "@/constants";
import { SignOutButton } from "@clerk/react";
import { Link } from "@tanstack/react-router";
import { LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="p-3 flex flex-col justify-between items-center bg-gray-100">
      <div>
        <div className="w-10 h-10 rounded-full bg-linear-to-tr from-rose-100 via-indigo-300 to-sky-600" />
        <div>
          {sidebarLinks.map((link) => (
            <Link
              to={link.href}
              key={link.id}
              className="rounded-full p-2 cursor-pointer flex items-center gap-2 bg-gray-200"
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
