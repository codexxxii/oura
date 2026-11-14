import { createFileRoute } from "@tanstack/react-router";
import { Show, SignOutButton } from "@clerk/react";

export const Route = createFileRoute("/_authenticated/home/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Show when={"signed-in"}>
        <SignOutButton>sign out</SignOutButton>
      </Show>
    </div>
  );
}
