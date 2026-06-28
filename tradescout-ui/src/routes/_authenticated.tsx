import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    if (!context.auth?.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: () => <Outlet />,
});
