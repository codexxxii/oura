import Nav from "@/components/nav";
import Sidebar from "@/components/sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isSignedIn) {
      throw redirect({
        to: "/sign-in",
        search: {
          redirect: location.href,
        },
      });
    }
  },

  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <div>
        <Nav />
        <Outlet />
      </div>
    </div>
  );
}
