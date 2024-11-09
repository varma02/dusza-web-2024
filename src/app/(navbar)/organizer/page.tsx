'use client'

import { Bar, BarChart, CartesianGrid, ComposedChart, Line, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
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
  const programmingEnvironments = {
    abc123: [
      {id: "abc123", name: "Next.js"},
      {id: "abd123", name: "Laravel"},
      {id: "abe123", name: "Django"},
      {id: "abh123", name: "Nuxt"},
      {id: "abi123", name: "FastAPI"},
      {id: "abj123", name: "Keretrendszer nélküli PHP"},
    ],
    abd123: [
      {id: "abg123", name: "Flutter"},
      {id: "abf123", name: "React Native"},
      {id: "bbf123", name: "Swift"},
    ],
    abe123: [
      {id: "aca123", name: "Python"},
      {id: "acb123", name: "Java"},
      {id: "acc123", name: "C Sharp"},
    ]
  }

  const dataMap = categories.reduce((prev, v)=> ({
    ...prev,
    [v.id]: [...programmingEnvironments[v.id].map((v) => ({...v, regisztrációk: Math.floor(Math.random() * 10) + 1}), {})]
  }), {})

  return (
    <main className="flex-1 p-4 grid gap-4 grid-cols-3 grid-rows-3">
      <Card className="row-span-2 col-span-2">
        <CardHeader as={Link} href="/organizer/registrations"
        color="foreground" className="justify-between group">
          <h2 className="font-semibold text-2xl">Regisztrációk</h2>
          <MdChevronRight size="1.5rem" className="opacity-0 transition-all group-hover:opacity-100" />
        </CardHeader>
        <CardBody className="flex-row">
          {categories.map((categ) => (
          <div className="flex flex-col flex-1 min-w-72" key={categ.id}>
            <h3 className="text-center font-semibold">{categ.name}</h3>
            <h4 className="text-2xl font-bold text-foreground-400 text-center">{dataMap[categ.id].reduce((p,c)=>p+c.regisztrációk, 0)} csapat</h4>
            <ResponsiveContainer>
                <BarChart
                data={dataMap[categ.id]}
                margin={{ top: 5, right: 30, left: 20, bottom: 5, }}
                >
                <XAxis dataKey="name" interval={0} textAnchor="" angle={35} height={55}/>
                <YAxis />
                <Tooltip wrapperClassName="!bg-content2 !border-none" />
                <Bar dataKey="regisztrációk" 
                fill="hsl(var(--nextui-primary) / var(--nextui-primary-opacity, 1))" 
                activeBar={<Rectangle fill="pink" stroke="blue" />} />
                </BarChart>
            </ResponsiveContainer>
          </div>
          ))}
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
