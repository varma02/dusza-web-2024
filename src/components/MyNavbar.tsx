'use client'

import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Image, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Logo from "@/assets/logo-min.webp";
import { MdAccountCircle, MdKey, MdLogout, MdVisibility, MdVisibilityOff } from "react-icons/md"

import { UserRole } from "@/types";
import { User } from "next-auth";
import { handleSignOut } from "@/actions/authActions";


export default function MyNavbar({ user }: { user: User | undefined }) {

  const changePasswordModal = useDisclosure();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();

  const menuItems = [
    {href: "/organizer", label: "Irányítópult", roles: [ UserRole.Organizer ] },
    {href: "/organizer/categories", label: "Kategóriák", roles: [ UserRole.Organizer ]},
    {href: "/organizer/schools", label: "Iskolák", roles: [ UserRole.Organizer ]},
    {href: "/organizer/registrations", label: "Regisztrációk", roles: [ UserRole.Organizer ]},
    {href: "/team", label: "Irányítópult", roles: [ UserRole.TeamMember ]},
    {href: "/team/notifications", label: "Hiánypótlás", roles: [ UserRole.TeamMember ]}
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
        <NavbarItem className="flex">
          <Dropdown>
            <DropdownTrigger>
              <Button variant="ghost" className="border-none py-1 px-4 text-base"
              endContent={<MdAccountCircle size="1.4rem" />}>
                <span className="lg:inline hidden">{user?.name}</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Felhasználói fiók"
              onAction={(k) => {
                if (k == "change_password") {
                  changePasswordModal.onOpenChange();
                } else if (k == "signout") {
                  handleSignOut();
                }
              }}
            >
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

      <Modal 
        isOpen={changePasswordModal.isOpen} 
        onOpenChange={changePasswordModal.onOpenChange}
        placement="auto"
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Jelszó megváltoztatása</ModalHeader>
              <ModalBody>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  label="Jelenlegi Jelszó"
                  placeholder="Adja meg jelszavát"
                  variant="bordered"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} aria-label="toggle password visibility">
                    {isPasswordVisible ? (
                      <MdVisibilityOff className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <MdVisibility className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                  }
                />
                <Divider className="my-4" />
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  label="Új jelszó"
                  placeholder="Adja meg az új jelszót"
                  variant="bordered"
                />
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  label="Új jelszó megerősítése"
                  placeholder="Adja meg az új jelszót"
                  variant="bordered"
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Mégse
                </Button>
                <Button color="primary" onPress={onClose}>
                  Megváltoztatás
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Navbar>
  );
}