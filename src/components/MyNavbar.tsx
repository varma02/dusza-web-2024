'use client'

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Image, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "@/assets/logo-min.webp";
import { MdLogout } from "react-icons/md"

import { UserRole } from "@/types";
import { User } from "next-auth";
import { handleSignOut } from "@/actions/authActions";


export default function MyNavbar({ user }: { user: User | undefined }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  const menuItems = [
    {href: "/organizer", label: "Irányítópult", roles: [ UserRole.Organizer ] },
    {href: "/organizer/registrations", label: "Regisztrációk", roles: [ UserRole.Organizer ]},
    {href: "/organizer/categories", label: "Kategóriák", roles: [ UserRole.Organizer ]},
    {href: "/organizer/schools", label: "Iskolák", roles: [ UserRole.Organizer ]},
  ]

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="full"
      className="bg-transparent"
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent justify="start">
        <NavbarBrand as={Link} href="/" className="gap-4 text-foreground">
          <Image height="2.5rem" src={Logo.src} alt="AI generált logo" />
          <p className="font-bold text-inherit">VJF</p>
        </NavbarBrand>
      </NavbarContent>

      {
        user?.role ? (
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            {menuItems.map((item) => (
              item.roles === undefined || item.roles.includes(user?.role) ? (
                <NavbarItem key={item.href}>
                  <Link href={item.href} 
                  color={pathName == item.href ? "primary": "foreground"}
                  aria-current={pathName == item.href ? "page": "false"}>
                    {item.label}
                  </Link>
                </NavbarItem>
              ) : null
            ))}
          </NavbarContent>
        ) : null
      }

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {user?.name}
        </NavbarItem>
        <NavbarItem>
          <form action={handleSignOut}>
            <Button
              type="submit"
              isIconOnly
              variant="light"
              color="primary"
            >
              <MdLogout className="p-0" />
            </Button>
          </form>
        </NavbarItem>
      </NavbarContent>

      {
        user?.role ? (
          <NavbarMenu className="gap-5">
            {menuItems.map((item) => (
              item.roles === undefined || item.roles.includes(user?.role) ? (
                <NavbarMenuItem key={item.href}>
                  <Link href={item.href} className="text-2xl"
                  color={pathName == item.href ? "primary": "foreground"}
                  aria-current={pathName == item.href ? "page": "false"}>
                    {item.label}
                  </Link>
                </NavbarMenuItem>
              ) : null
            ))}
          </NavbarMenu>
        ) : null
      }
    </Navbar>
  );
}