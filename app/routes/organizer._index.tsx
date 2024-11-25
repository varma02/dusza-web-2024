import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardBody, CardHeader, Link, CardFooter, Button, ScrollShadow, CheckboxGroup, Checkbox, RadioGroup, Radio, Divider, Select, SelectItem } from "@nextui-org/react";
import { MdChevronRight, MdFileDownload, MdFilterAltOff } from "react-icons/md";
import { useToaster } from "~/components/ToastProvider";
import { Form } from "@remix-run/react";

export default function OrganizerDashboard() {

  const { newToast } = useToaster();

  return (
    <main className="flex-1 p-4 xl:grid flex flex-col gap-4 xl:grid-cols-3 xl:grid-rows-3 xl:h-[90vh] xl:max-w-screen-2xl xl:mx-auto">
      <Card className="row-span-2 col-span-2 xl:max-h-none max-h-[40rem]">
        <CardHeader as={Link} href="/organizer/registrations"
        className="justify-between group text-foreground">
          <h2 className="font-semibold text-2xl">Regisztrációk</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="flex-row flex-wrap justify-center flex-1">
          {[{id:"123", name:"category1", teams:[], programmingLanguages: [{name: "language1", teams: []}]}].map((categ) => (
          <div className="flex flex-col flex-1 min-w-72 min-h-[30rem] pb-4" key={categ.id}>
            <h3 className="text-center font-semibold">{categ.name}</h3>
            <h4 className="text-2xl font-bold text-foreground-400 text-center">{categ.teams.length} csapat</h4>
            <ResponsiveContainer height="100%">
                <BarChart
                data={categ.programmingLanguages.map((v) => ({...v, regisztrációk: v.teams.length}))}
                margin={{ top: 5, right: 30, left: 20, bottom: 5, }}
                >
                <XAxis dataKey="name" interval={0} textAnchor="" angle={35} height={55}/>
                <YAxis />
                <Tooltip wrapperClassName="!bg-content2 !border-none" cursor={false} />
                <Bar dataKey="regisztrációk" 
                fill="hsl(var(--nextui-primary) / var(--nextui-primary-opacity, 1))" 
                activeBar={<Rectangle fill="hsl(var(--nextui-secondary) / var(--nextui-secondary-opacity, 1))" />} />
                </BarChart>
            </ResponsiveContainer>
          </div>
          ))}
        </CardBody>
      </Card>

      <Card>
        <CardHeader as={Link} href="/organizer/categories"
        className="justify-between group text-foreground pb-0">
          <h2 className="font-semibold text-2xl">Kategóriák</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="py-2 flex-1">
          <ScrollShadow className="flex-1 py-2">
            <RadioGroup >
              {[{id:"123", valid_until: new Date("2007-03-01T13:00:00Z"), name: "kateg"}].map((category) => (
                <Radio key={category.id} value={category.id} classNames={{label: "text-lg"}}
                description={`Lezárul: ${category.valid_until.toLocaleString('hu')}`}>
                  {category.name}
                </Radio>
              ))}
            </RadioGroup>
          </ScrollShadow>
        </CardBody>
        <CardFooter>
          <Button type="button" onClick={()=>newToast("warning", "Szűrők törlése", "TODO")}>
            <MdFilterAltOff/> Szűrő törlése
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader as={Link} href="/organizer/categories"
        className="justify-between group text-foreground pb-0">
          <h2 className="font-semibold text-2xl">Programozási környezetek</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="py-2 flex-1">
          <ScrollShadow className="flex-1 py-2">
            <CheckboxGroup >
              {[{id: "123", name: "kateg", programmingLanguages: [{id: "123", name: "lang"}]}].map(categ => (
                <div key={categ.id} className="flex flex-wrap gap-2">
                  <h3 key={categ.id} className="mt-2 text-lg font-semibold w-full">{categ.name}</h3>
                  <Divider />
                  {categ.programmingLanguages.map((pl) => (
                      <Checkbox key={pl.id} value={pl.id}
                      classNames={{label: "text-lg", base: "mr-4"}}>
                        {pl.name}
                      </Checkbox>
                  ))}
                </div>
              ))}
            </CheckboxGroup>
          </ScrollShadow>
        </CardBody>
        <CardFooter>
          <Button type="button" onClick={()=>newToast("warning", "Szűrők törlése", "TODO")}>
            <MdFilterAltOff/> Szűrő törlése
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-2xl">Adatok exportálása</h2>
        </CardHeader>
        <Form className="contents" action="get" onSubmit={()=>newToast("warning", "Adatok exportálása", "TODO")}>
          <CardBody className="gap-4 flex-1">
          <Select isRequired name="format"
          label="Formátum" labelPlacement="outside">
            <SelectItem key="csv">
              CSV (.csv)
            </SelectItem>
            <SelectItem key="xlsx">
              Excel (.xlsx)
            </SelectItem>
          </Select>
          {/* <ListboxSelector name="columns" label="Oszlopok" /> */}
          </CardBody>
          <CardFooter>
            <Button color="primary" type="submit"
            startContent={<MdFileDownload />}>
              Exportálás
            </Button>
          </CardFooter>
        </Form>
      </Card>

      <Card className="col-span-2">

      </Card>
    </main>
  );
}