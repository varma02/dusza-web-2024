'use client'

import { Image, Link } from "@nextui-org/react";

export default function NotFoundPage() {

  return (
    <main className="min-h-screen flex-1 flex flex-col gap-6 justify-center items-center">
      <Image src="https://http.cat/images/404.jpg" alt="404" />
      <h1 className="text-center text-3xl">
        Az oldal nem található
      </h1>
      <Link href="/">Vissza a főoldalra</Link>
    </main>
  )
}