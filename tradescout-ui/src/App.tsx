import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { useAuth } from "./hooks/useAuth/useAuth";
import "./App.css";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

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
  const auth = useAuth();

  useEffect(() => {
    router.invalidate();
  }, [auth.user, auth.loading]);

  if (auth.loading) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="success" />
      </Box>
    );
  }

  return <RouterProvider router={router} context={{ auth }} />;
};

export default App;
