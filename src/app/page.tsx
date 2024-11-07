import { Button } from "@nextui-org/react";
import prisma from "@/lib/db";

export default async function Home() {
  const test = await prisma.test.findMany();

  return (
    <div>
      <Button color="primary">Hello, World!</Button>
      <ul>
        {test.map((t) => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}
