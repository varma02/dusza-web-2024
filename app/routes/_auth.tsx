import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Outlet />
    </div>
  )
}