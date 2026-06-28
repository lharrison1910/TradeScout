import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  redirect,
} from "@tanstack/react-router";
import type { AuthContextType } from "../context/Auth/auth.context";

export type RouterContext = {
  auth: AuthContextType;
  queryClient: QueryClient;
};

const RouteComponent = () => {
  return <Outlet />;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ context, location }) => {
    const { auth } = context;

    if (!auth?.user && location.pathname !== "/login") {
      throw redirect({
        to: "/login",
      });
    }

    if (auth?.user && location.pathname === "/login") {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
  errorComponent: ({ error }) => {
    return <>{String(error)}</>;
  },
});
