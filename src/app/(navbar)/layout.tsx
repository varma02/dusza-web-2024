import { auth } from "@/auth";
import MyNavbar from "@/components/MyNavbar";
import { ReactNode } from "react";

export default async function NavbarLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto flex flex-col">
      <MyNavbar user={session?.user} />
      { children }
    </div>
  );
}