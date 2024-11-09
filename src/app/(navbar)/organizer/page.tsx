'use client'

import { Bar, BarChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardBody, CardHeader, Link, CardFooter, Button, ScrollShadow, CheckboxGroup, Checkbox, Spinner, RadioGroup, Radio } from "@nextui-org/react";
import { MdChevronRight, MdFilterAltOff } from "react-icons/md";
import { useEffect, useState } from "react";
import { organizerLoadDashboard } from "@/actions/registrations";

export default function OrganizerDashboard() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [peFilter, setPEFilter] = useState<string[]>([]);

  const [data, setData] = useState<ReturnType<typeof organizerLoadDashboard> extends Promise<infer R> ? R : never | null>();

  useEffect(()=>{
    organizerLoadDashboard()
    .then((d) => {setData(d)}, (e) => console.warn(e))
  }, [])

  return (
    <main className="flex-1 p-4 grid gap-4 grid-cols-3 grid-rows-3">
      <Card className="row-span-2 col-span-2">
        <CardHeader as={Link} href="/organizer/registrations"
        className="justify-between group text-foreground">
          <h2 className="font-semibold text-2xl">Regisztrációk</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="flex-row justify-center">
          {data ? data.categories.map((categ) => (
          <div className="flex flex-col flex-1 min-w-72" key={categ.id}>
            <h3 className="text-center font-semibold">{categ.name}</h3>
            <h4 className="text-2xl font-bold text-foreground-400 text-center">{categ.teams.length} csapat</h4>
            <ResponsiveContainer>
                <BarChart
                data={data.graph_data.find((v) => v.id === categ.id)?.programmingLanguages.map((v) => ({...v, regisztrációk: v.teams.length}))}
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
          )) : <Spinner />}
        </CardBody>
      </Card>

      <Card>
        <CardHeader as={Link} href="/organizer/categories"
        className="justify-between group text-foreground">
          <h2 className="font-semibold text-2xl">Kategóriák</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="py-2">
          <ScrollShadow className="flex-1">
            <RadioGroup value={categoryFilter} onValueChange={setCategoryFilter}>
              {data ? data.categories.map((category) => (
                <Radio key={category.id} value={category.id} classNames={{label: "text-lg"}}
                description={`Lezárul: ${category.valid_until.toLocaleString('hu')}`}>
                  {category.name}
                </Radio>
              )) : <Spinner />}
            </RadioGroup>
          </ScrollShadow>
        </CardBody>
        <CardFooter>
          <Button type="button" onClick={()=>setCategoryFilter(null)}>
            <MdFilterAltOff/> Szűrő törlése
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader as={Link} href="/organizer/categories"
        className="justify-between group text-foreground">
          <h2 className="font-semibold text-2xl">Programozási környezetek</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="py-2">
          <ScrollShadow className="flex-1">
            <CheckboxGroup classNames={{wrapper: "flex flex-row flex-wrap"}}
            value={peFilter} onValueChange={setPEFilter}>
              {/* {programmingEnvironments.map(environment => (
                <Checkbox key={environment.id} value={environment.id}
                classNames={{label: "text-lg", base: "mr-4"}}>
                  {environment.name}
                </Checkbox>
              ))} */}
            </CheckboxGroup>
          </ScrollShadow>
        </CardBody>
        <CardFooter>
          <Button type="button" onClick={()=>setPEFilter([])}>
            <MdFilterAltOff/> Szűrő törlése
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="font-semibold text-2xl">Adatok exportálása</h2>
        </CardHeader>
        <CardBody>
          
        </CardBody>
      </Card>

      <Card className="col-span-2">

      </Card>
    </main>
  );
}
