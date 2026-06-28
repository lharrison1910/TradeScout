import { createFileRoute, useRouter } from "@tanstack/react-router";
import Home from "../../pages/Home/Home";

export const Route = createFileRoute("/_authenticated/")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    console.log(auth.user);

    if (auth.user) {
      return <Home />;
    }
  },
});
