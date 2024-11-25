import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Image, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { MdAccountCircle, MdKey, MdLogout } from "react-icons/md";
import { useHref } from "@remix-run/react";
import { useState } from "react";
import { useToaster } from "./ToastProvider";

export default function MyNavbar() {

  const { newToast } = useToaster();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const href = useHref("/");

  const menuItems = [
    {href: "/organizer", label: "Irányítópult", roles: [  ] },
    {href: "/organizer/categories", label: "Kategóriák", roles: [  ]},
    {href: "/organizer/schools", label: "Iskolák", roles: [  ]},
    {href: "/organizer/registrations", label: "Regisztrációk", roles: [  ]},
    {href: "/team", label: "Csapat", roles: [  ]},
    {href: "/team/messages", label: "Üzenetek", roles: [  ]},
    {href: "/school", label: "Jelentkezések", roles: [  ]}
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
          <Image height="2.5rem" src="/logo-min.webp" alt="AI generált logo" />
          <h1 className="font-bold text-inherit">Dusza VJF</h1>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} 
            color={href == item.href ? "primary": "foreground"}
            aria-current={href == item.href ? "page": "false"}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="flex">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="ghost" className="border-none py-1 px-4 text-base"
              endContent={<MdAccountCircle size="1.4rem" />}>
                <span className="lg:inline hidden">username</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Felhasználói fiók"
            onAction={(key) => {
              if (key == "signout") {
                newToast("success", "Sikeresen kijelentkeztél");
              } else if (key == "change_password") {
                console.log("Jelszó megváltoztatása");
              }
            }}>
              <DropdownItem key="change_password"
              startContent={<MdKey />}>
                Jelszó megváltoztatása
              </DropdownItem>
              <DropdownItem key="signout" 
              className="text-danger" color="danger"
              startContent={<MdLogout />}>
                Kijelentkezés
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="gap-5">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link href={item.href} className="text-2xl"
            color={href == item.href ? "primary": "foreground"}
            aria-current={href == item.href ? "page": "false"}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}