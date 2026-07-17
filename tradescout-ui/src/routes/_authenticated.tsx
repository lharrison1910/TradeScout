import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";
import "./_authenticated.css";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context, location }) => {
    if (context.auth.loading) {
      return;
    }

    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <div className="wrapper">
      <Navbar />
      <Outlet />
    </div>
  ),
});
