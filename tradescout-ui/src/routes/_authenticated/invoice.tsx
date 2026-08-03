import { createFileRoute, useRouter } from "@tanstack/react-router";
import InvoicePage from "../../pages/Invoice/Invoice";

export const Route = createFileRoute("/_authenticated/invoice")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    if (auth.user) {
      return <InvoicePage />;
    }
  },
});
