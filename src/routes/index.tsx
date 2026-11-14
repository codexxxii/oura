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
          <div className="w-7 h-7 rounded-full bg-linear-to-tr from-rose-200 via-indigo-400 to-sky-600" />
          <p className="text-2xl font-semibold tracking-tighter">Oura</p>
        </div>
        <nav className="flex items-center gap-4">
          <Show when={"signed-in"}>
            <Link to="/home">Home</Link>
            <SignOutButton>
              <button>Sign Out</button>
            </SignOutButton>
          </Show>
          <Show when={"signed-out"}>
            <Link to="/sign-in">
              <button>Sign In</button>
            </Link>
            <Link to="/sign-up">
              <button className="items-center gap-2 border-blac bg-black text-white">
                Get Started <ArrowRight size={12} />
              </button>
            </Link>
          </Show>
        </nav>
      </header>
    </div>
  );
}
