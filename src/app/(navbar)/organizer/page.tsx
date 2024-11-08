import { Card, CardBody, CardHeader, Link, Spinner, RadioGroup, Radio, CardFooter, Button, ScrollShadow } from "@nextui-org/react";
import { MdChevronRight, MdFilterAltOff } from "react-icons/md";

export default function Home() {

  return (
    <main className="flex-1 p-4 grid gap-4 grid-cols-3 grid-rows-3">
      <Card className="row-span-2 col-span-2">
        <CardHeader as={Link} href="/organizer/registrations"
        color="foreground" className="justify-between group">
          <h2 className="font-semibold text-2xl">Regisztrációk</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
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
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody>
          <ScrollShadow className="flex-1">
            <RadioGroup>
              <Radio value="123"
              description="Lezárul: 2024. 11. 10. 11:00">
                Weblap fejlesztés
              </Radio>
              <Radio value="456" 
              description="Lezárul: 2024. 11. 10. 11:00">
                Mobil alkalmazás fejlesztés
              </Radio>
              <Radio value="789"
              description="Lezárul: 2024. 11. 10. 11:00">
                Hagyományos programozás
              </Radio>
            </RadioGroup>
          </ScrollShadow>
        </CardBody>
        <CardFooter>
          <Button><MdFilterAltOff/> Szűrők törlése</Button>
        </CardFooter>
      </Card>
    </main>
  );
}
