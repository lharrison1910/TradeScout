import { createFileRoute, useRouter } from "@tanstack/react-router";
import Terms from "../../pages/Terms/Terms";

export const Route = createFileRoute("/_authenticated/terms")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    if (auth.user) {
      return <Terms />;
    }
  },
});
