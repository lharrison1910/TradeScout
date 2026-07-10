import { createFileRoute, useRouter } from "@tanstack/react-router";
import Settings from "../../pages/Settings/Settings";

export const Route = createFileRoute("/_authenticated/settings")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    if (auth.user) {
      return <Settings />;
    }
  },
});
