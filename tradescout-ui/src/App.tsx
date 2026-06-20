import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import "./App.css";

export type RouterContext = {
  // auth: AuthContextType;
  // queryClient: QueryClient;
  auth: any;
  queryClient: any;
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
  // interface HistoryState {
  //   toast?: Toast;
  //   sortie?: NewSortieDto;
  // }
}

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
