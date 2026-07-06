import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import Navbar from "../components/Navbar/Navbar";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: ({ context }) => {
    if (!context.auth?.user) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: () => (
    <>
      <Navbar />
      <Outlet />
    </>
  ),
});
