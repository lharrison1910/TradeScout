import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import type { QueryClient } from "@tanstack/react-query";
import type { AuthContextType } from "./context/Auth/auth.context";
// import "./App.css";

export type RouterContext = {
  auth: AuthContextType;
  queryClient: QueryClient;
};

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    queryClient: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
