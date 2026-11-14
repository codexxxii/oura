import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import { useAuth } from "@clerk/react";

interface RouterContext {
  auth: ReturnType<typeof useAuth>;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});
