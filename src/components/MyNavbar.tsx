'use client'

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Image } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Logo from "@/assets/logo-min.webp";

export default function MyNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const pathName = usePathname();

  const menuItems = "szervezo" ? [
    {href: "/organizer", label: "Irányítópult"},
    {href: "/organizer/registrations", label: "Regisztrációk"},
    {href: "/organizer/categories", label: "Kategóriák"},
    {href: "/organizer/schools", label: "Iskolák"},
  ] : "iskola" ? [

  ] : "csapattag" ? [

  ] : [];

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
        <NavbarBrand className="gap-4">
          <Image height="2.5rem" src={Logo.src} alt="AI generált logo" />
          <p className="font-bold text-inherit">VJF</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} 
            color={pathName == item.href ? "primary": "foreground"}
            aria-current={pathName == item.href ? "page": "false"}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          user avatar here
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="gap-5">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link href={item.href} className="text-2xl"
            color={pathName == item.href ? "primary": "foreground"}
            aria-current={pathName == item.href ? "page": "false"}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}