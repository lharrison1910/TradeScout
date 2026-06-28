import type { QueryClient } from "@tanstack/react-query";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import type { AuthContextType } from "../context/Auth/auth.context";

export type RouterContext = {
  auth: AuthContextType;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,

  errorComponent: ({ error }) => {
    return <>{String(error)}</>;
  },
});
