import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/expense")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    if (auth.user) {
      return <>Expense</>;
    }
  },
});
