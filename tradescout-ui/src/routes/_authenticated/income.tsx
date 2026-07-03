import { createFileRoute, useRouter } from "@tanstack/react-router";
import IncomePage from "../../pages/Income/Income";

export const Route = createFileRoute("/_authenticated/income")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    if (auth.user) {
      return <IncomePage />;
    }
  },
});
