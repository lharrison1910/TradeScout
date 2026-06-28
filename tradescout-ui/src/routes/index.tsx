import { createFileRoute, useRouter } from "@tanstack/react-router";
import Home from "../pages/Home/Home";

export const Route = createFileRoute("/")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    if (auth.user) {
      return <Home />;
    }
  },
});
