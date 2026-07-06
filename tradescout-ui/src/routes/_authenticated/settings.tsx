import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/settings")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    if (auth.user) {
      return <>Settings</>;
    }
  },
});
