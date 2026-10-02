import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";
import "./_authenticated.css";
import Footer from "../components/Footer/Footer";

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
    console.log(context.auth.user);
  },
  component: () => (
    <div className="wrapper">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  ),
});
