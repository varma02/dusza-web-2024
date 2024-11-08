import MyNavbar from "@/components/MyNavbar";
import { ReactNode } from "react";

export default function NavbarLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto flex flex-col">
      <MyNavbar />
      { children }
    </div>
  );
}