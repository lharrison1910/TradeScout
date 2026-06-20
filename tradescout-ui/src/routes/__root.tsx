import { createRootRoute, Outlet } from "@tanstack/react-router";

const RouteComponent = () => {
  return <Outlet />;
};

export const Route = createRootRoute({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return <>{String(error)}</>;
  },
});
