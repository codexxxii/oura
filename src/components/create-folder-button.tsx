import {
  useState,
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FolderPlus, X, Loader2, PlusIcon } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";

export default function CraeteFolderButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white shadow-sm shadow-blue-500/20 transition-all duration-200 hover:bg-blue-600 hover:shadow-md hover:shadow-blue-500/20 active:scale-[0.97]"
      >
        <PlusIcon size={16} strokeWidth={2} />
        <span>Folder</span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && <CreateFolderModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
}

function CreateFolderModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [name, setName] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const createFolder = useMutation(api.folders.createFolder);

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setName("");
      setError("");
    }
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen || isSaving) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, isSaving]);

  const handleSave = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter a folder name.");
      return;
    }

    if (isSaving) return;

    setIsSaving(true);
    setError("");

    try {
      const newFolder = await createFolder({ name });

      if (newFolder.success) {
        setIsOpen(false);
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="create-folder-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[3px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !isSaving) {
              setIsOpen(false);
            }
          }}
        >
          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-folder-title"
            aria-describedby="create-folder-description"
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 12,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 8,
            }}
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 30,
            }}
            onAnimationComplete={() => {
              if (isOpen) inputRef.current?.focus();
            }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-black/10"
          >
            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4">
              <div className="flex items-start gap-3">
                {/* Icon */}
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-500">
                  <FolderPlus size={21} strokeWidth={1.8} />
                </div>

                <div>
                  <h2
                    id="create-folder-title"
                    className="text-lg font-semibold tracking-tight text-gray-900"
                  >
                    Create new folder
                  </h2>

                  <p
                    id="create-folder-description"
                    className="mt-1 text-sm leading-relaxed text-gray-500"
                  >
                    Organize your files by creating a new folder.
                  </p>
                </div>
              </div>

              {/* Close */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={isSaving}
                aria-label="Close modal"
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:cursor-not-allowed"
              >
                <X size={17} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave}>
              <div className="px-6 pb-6 pt-2">
                <label
                  htmlFor="folder-name"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Folder name
                </label>

                <input
                  ref={inputRef}
                  id="folder-name"
                  type="text"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="e.g. My Projects"
                  maxLength={100}
                  disabled={isSaving}
                  aria-invalid={!!error}
                  aria-describedby={error ? "folder-name-error" : undefined}
                  className="h-11 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 disabled:opacity-50"
                />

                {/* Error */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      id="folder-name-error"
                      role="alert"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="mt-2 text-xs text-red-500"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <p className="mt-2 text-xs text-gray-400">
                  Choose a name that makes your folder easy to find.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  disabled={isSaving}
                  className="h-10 cursor-pointer rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving || !name.trim()}
                  className="flex h-10 min-w-28 cursor-pointer items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 text-sm font-medium text-white shadow-sm shadow-blue-500/20 transition-all hover:bg-blue-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FolderPlus size={16} />
                      Create Folder
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
