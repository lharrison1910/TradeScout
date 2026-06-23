import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { RouterContext } from "../App";

const RouteComponent = () => {
  return <Outlet />;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return <>{String(error)}</>;
  },
});
