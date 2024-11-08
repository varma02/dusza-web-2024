'use client'

import { Card, CardBody, CardHeader, Link, Spinner, ListboxItem, Listbox } from "@nextui-org/react";
import { FaChevronRight, FaCode } from "react-icons/fa";

export default function Home() {

  const categories = [
    {key: "1", label: "Webfejlesztés"},
    {key: "2", label: "Mobilfejlesztés"},
    {key: "3", label: "Hagyományos programozás"},
  ]

  return (
    <main className="min-h-screen p-4 grid gap-4 grid-cols-3 grid-rows-3">
      <Card className="row-span-2 col-span-2">
        <CardHeader as={Link} href="/organizer/registrations"
        color="foreground" className="justify-between group">
          <h2 className="font-semibold text-2xl">Regisztrációk</h2>
          <FaChevronRight className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody>
          <div className="rounded-lg flex-1 flex flex-col items-center justify-center">
            <Spinner />
            <p>fancy chart here</p>
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardHeader as={Link} href="/organizer/categories"
        color="foreground" className="justify-between group">
          <h2 className="font-semibold text-2xl">Kategóriák</h2>
          <FaChevronRight className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody>
          <Listbox 
            aria-label="Single selection example"
            variant="flat"
            selectionMode="single"
            // selectedKeys={selectedKeys}
            // onSelectionChange={setSelectedKeys}
          >
            <ListboxItem key="text">Webfejlesztés</ListboxItem>
            <ListboxItem key="number">Mobil </ListboxItem>
            <ListboxItem key="date">Hagyományos</ListboxItem>
          </Listbox>
        </CardBody>
      </Card>
    </main>
  );
}
