import { Search, SidebarOpen, SidebarClose } from "lucide-react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export default function Nav() {
  const { isOpen, setIsOpen } = useStore();

  return (
    <header className="flex h-14 w-full shrink-0 items-center justify-between border-b border-gray-100 bg-white px-4">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isOpen}
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={isOpen ? "open" : "closed"}
              initial={{ opacity: 0, rotate: -15, scale: 0.8 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 15, scale: 0.8 }}
              transition={{ duration: 0.15 }}
            >
              {isOpen ? (
                <SidebarClose size={18} strokeWidth={1.8} />
              ) : (
                <SidebarOpen size={18} strokeWidth={1.8} />
              )}
            </motion.div>
          </AnimatePresence>
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Search"
          className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900"
        >
          <Search size={18} strokeWidth={1.8} />
        </button>
      </div>
    </header>
  );
}
