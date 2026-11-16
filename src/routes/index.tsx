import { Show, SignOutButton } from "@clerk/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <header className="w-full h-15 flex justify-between items-center px-10">
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-linear-to-tr from-rose-100 via-indigo-300 to-sky-600" />
          <p className="text-2xl font-semibold tracking-tighter">Oura</p>
        </div>
        <nav className="flex items-center gap-4 text-sm">
          <Show when={"signed-in"}>
            <Link to="/home">Home</Link>
            <SignOutButton>
              <button className="border-rose-500 bg-rose-500 text-rose-50">
                Sign Out
              </button>
            </SignOutButton>
          </Show>
          <Show when={"signed-out"}>
            <Link to="/sign-in">
              <button className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-blue-500 px-4 text-sm font-medium text-blue-500 shadow-sm shadow-blue-500/20 transition-all duration-200 hover:shadow-md hover:shadow-blue-500/20">
                Sign In
              </button>
            </Link>
            <Link to="/sign-up">
              <button className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 text-sm font-medium text-white shadow-sm shadow-blue-500/20 transition-all duration-200 hover:bg-blue-600 hover:shadow-md hover:shadow-blue-500/20">
                Get Started <ArrowRight size={12} />
              </button>
            </Link>
          </Show>
        </nav>
      </header>
    </div>
  );
}
