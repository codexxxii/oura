import { sidebarLinks } from "@/constants";
import { SignOutButton } from "@clerk/react";
import { Link, useLocation } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/lib/store";

const transition = {
  duration: 0.25,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export default function Sidebar() {
  const location = useLocation();

  const { isOpen } = useStore();

  return (
    <motion.aside
      initial={false}
      animate={{
        width: isOpen ? 220 : 64,
      }}
      transition={transition}
      className="flex h-screen sticky top-0 left-0 shrink-0 flex-col overflow-hidden border-r border-gray-100 bg-white"
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-3">
        <div className="flex h-10 w-full items-center gap-1 px-1">
          <div className="size-8 shrink-0 rounded-full bg-linear-to-tr from-rose-100 via-indigo-300 to-sky-600 shadow-sm" />

          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.15 }}
                className="whitespace-nowrap text-2xl font-semibold tracking-tighter text-gray-900"
              >
                Oura
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-3 px-3 py-4">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;

          const isActive =
            location.pathname === link.href ||
            location.pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.id}
              to={link.href}
              title={!isOpen ? link.label : undefined}
              aria-label={link.label}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "relative flex h-10 w-full shrink-0 items-center gap-3 overflow-hidden rounded-xl px-2 transition-colors duration-200",
                isActive
                  ? "bg-blue-500 text-white shadow-sm shadow-blue-500/20"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              {/* Icon */}
              <span className="flex size-6 shrink-0 items-center justify-center">
                <Icon size={18} strokeWidth={1.8} />
              </span>

              {/* Label */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -8,
                    }}
                    transition={{
                      duration: 0.15,
                      delay: isOpen ? 0.08 : 0,
                    }}
                    className="whitespace-nowrap text-sm font-medium"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex flex-col gap-2 border-t border-gray-100 p-3">
        <SignOutButton>
          <button
            type="button"
            title={!isOpen ? "Sign Out" : undefined}
            aria-label="Sign Out"
            className="flex h-10 w-full cursor-pointer items-center gap-3 overflow-hidden rounded-xl px-2 text-gray-500 transition-colors duration-200 hover:bg-red-50 hover:text-red-500"
          >
            <span className="flex size-6 shrink-0 items-center justify-center">
              <LogOut size={18} strokeWidth={1.8} />
            </span>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.span
                  initial={{
                    opacity: 0,
                    x: -8,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -8,
                  }}
                  transition={{
                    duration: 0.15,
                    delay: isOpen ? 0.08 : 0,
                  }}
                  className="whitespace-nowrap text-sm font-medium"
                >
                  Sign Out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </SignOutButton>
      </div>
    </motion.aside>
  );
}
