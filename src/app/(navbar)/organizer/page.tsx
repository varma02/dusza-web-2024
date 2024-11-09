'use client'

import { Bar, CartesianGrid, ComposedChart, Line, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardBody, CardHeader, Link, CardFooter, Button, ScrollShadow, CheckboxGroup, Checkbox } from "@nextui-org/react";
import { MdChevronRight, MdFilterAltOff } from "react-icons/md";
import { useState } from "react";

export default function Home() {
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [peFilter, setPEFilter] = useState<string[]>([]);

  const categories = [
    {id: "abc123", name: "Weblap fejlesztés", deadline: "2024. 11. 10."},
    {id: "abd123", name: "Mobil alkalmazás fejlesztés", deadline: "2024. 11. 10."},
    {id: "abe123", name: "Hagyományos programozás", deadline: "2024. 11. 10."}
  ]
  const programmingEnvironments = [
    {id: "abc123", name: "Next.js"},
    {id: "abd123", name: "Laravel"},
    {id: "abe123", name: "Django"},
    {id: "abf123", name: "React Native"},
    {id: "abg123", name: "Flutter"},
    {id: "abh123", name: "Nuxt"},
    {id: "abi123", name: "FastAPI"},
    {id: "abj123", name: "Keretrendszer nélküli PHP"},
  ]

  const dataMap = categories.map((v)=> {
    const pmap = programmingEnvironments.reduce((prev, curr) => ({...prev, [curr.name]: Math.floor(Math.random() * 10) + 1}), {})
    return {
      ...v, ...pmap, "összesen": Object.values<number>(pmap).reduce((p, c) => p+c, 0)
    }
  })

  return (
    <main className="flex-1 p-4 grid gap-4 grid-cols-3 grid-rows-3">
      <Card className="row-span-2 col-span-2">
        <CardHeader as={Link} href="/organizer/registrations"
        color="foreground" className="justify-between group">
          <h2 className="font-semibold text-2xl">Regisztrációk</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={dataMap}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="10 20" />
              <XAxis dataKey="name" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip wrapperClassName="!bg-content2 !border-none" cursor={false}/>
              {programmingEnvironments.map(env => (
                <Bar key={env.id} yAxisId="left" dataKey={env.name} fill="#006fee" className="fill-primary" activeBar={<Rectangle className="fill-secondary" />} />
              ))}
              <Line dataKey="összesen" stroke="#9353d3" strokeWidth={5} yAxisId="right" />
            </ComposedChart>
          </ResponsiveContainer>
        </CardBody>
      </Card>

      <Card>
        <CardHeader as={Link} href="/organizer/categories"
        color="foreground" className="justify-between group">
          <h2 className="font-semibold text-2xl">Kategóriák</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="py-2">
          <ScrollShadow className="flex-1">
            <CheckboxGroup value={categoryFilter} onValueChange={setCategoryFilter}>
              {categories.map(category => (
                <Checkbox key={category.id} value={category.id}
                classNames={{label: "text-lg"}}>
                  {category.name}
                  <span className="text-base text-foreground-300 block">Határidő: {category.deadline}</span>
                </Checkbox>
              ))}
            </CheckboxGroup>
          </ScrollShadow>
        </CardBody>
        <CardFooter>
          <Button type="button" onClick={()=>setCategoryFilter([])}>
            <MdFilterAltOff/> Szűrő törlése
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader as={Link} href="/organizer/categories"
        color="foreground" className="justify-between group">
          <h2 className="font-semibold text-2xl">Programozási környezetek</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="py-2">
          <ScrollShadow className="flex-1">
            <CheckboxGroup classNames={{wrapper: "flex flex-row flex-wrap"}}
            value={peFilter} onValueChange={setPEFilter}>
              {programmingEnvironments.map(environment => (
                <Checkbox key={environment.id} value={environment.id}
                classNames={{label: "text-lg", base: "mr-4"}}>
                  {environment.name}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </ScrollShadow>
        </CardBody>
        <CardFooter>
          <Button type="button" onClick={()=>setPEFilter([])}>
            <MdFilterAltOff/> Szűrő törlése
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
