import { createFileRoute, useRouter } from "@tanstack/react-router";
import FeedbackForm from "../../components/Feedback/Feedback";

export const Route = createFileRoute("/_authenticated/feedback")({
  component: () => {
    const router = useRouter();
    const { auth } = router.options.context;

    if (auth.user) {
      console.log(auth.user);
      return <FeedbackForm />;
    }
  },
});
