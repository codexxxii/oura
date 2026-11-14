import { SignIn } from "@clerk/react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/sign-in/")({
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  component: RouteComponent,
});

function RouteComponent() {
  const { redirect } = Route.useSearch();

  const redirectUrl =
    redirect?.startsWith("/") && !redirect.startsWith("//")
      ? redirect
      : "/home";

  return (
    <div className="min-h-screen flex items-center justify-center">
      <SignIn routing="hash" fallbackRedirectUrl={redirectUrl} />
    </div>
  );
}
