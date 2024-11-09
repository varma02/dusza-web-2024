import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const web = await prisma.category.create({data: {
    name: "Webfejlesztés", 
    valid_from: new Date("2021-09-01"), 
    valid_until: new Date("2022-09-01"),
    programmingLanguages: {
      createMany: {data: [
        {name: "React"},
        {name: "Angular"},
        {name: "Vue"},
        {name: "Svelte"},
        {name: "PHP"},
      ]},
    },
  }});
  const mobil = await prisma.category.create({data: {
    name: "Mobilfejlesztés", 
    valid_from: new Date("2021-09-01"), 
    valid_until: new Date("2022-09-01"),
    programmingLanguages: {
      createMany: {data: [
        {name: "React Native"},
        {name: "Flutter"},
        {name: "Swift"},
        {name: "Kotlin"},
        {name: "Java"},
      ]},
    },
  }});
  const hagyom = await prisma.category.create({data: {
    name: "Hagyományos programozás", 
    valid_from: new Date("2021-09-01"), 
    valid_until: new Date("2022-09-01"),
    programmingLanguages: {
      createMany: {data: [
        {name: "Python"},
        {name: "JavaScript"},
        {name: "Java"},
        {name: "Rust"},
        {name: "C#"},
        {name: "C++"},
      ]},
    },
  }});

  const kando = await prisma.school.create({data: {
    name: "Kecskeméti SZC Kandó Kálmán Technikum",
    address: "6000 Kecskemét, Bethlen krt. 63",
    contact_email: "juhász.imre@kkando.hu",
    contact_name: "Juhász Imre",
    user: {create: {
      role: 2,
      username: "juhasz.imre",
      password: "$2a$12$DUB9D8a79PqaV6f8A2d05.JBuAGMAglctP5i8EjqVsjtTUq9nxyA2", // 1234
    }}
  }});

  const nagyk = await prisma.school.create({data: {
    name: "Nagykőrösi Református Gimnázium",
    address: "2750 Nagykőrös, Hősök tere",
    contact_email: "igazgato@nagykoros.eu",
    contact_name: "Dr. Cziráné Dr. Kőházi-Kis Tímea",
    user: {create: {
      role: 2,
      username: "kk.timea",
      password: "$2a$12$DUB9D8a79PqaV6f8A2d05.JBuAGMAglctP5i8EjqVsjtTUq9nxyA2", // 1234
    }}
  }})

  const bolyai = await prisma.school.create({data: {
    name: "Kecskeméti Bólyai János Gimnázium",
    address: "6000 Kecskemét, Irínyi u. 49",
    contact_email: "harnos@citromail.hu",
    contact_name: "Harnos István",
    user: {create: {
      role: 2,
      username: "harnos.istvan",
      password: "$2a$12$DUB9D8a79PqaV6f8A2d05.JBuAGMAglctP5i8EjqVsjtTUq9nxyA2", // 1234
    }}
  }})

  await prisma.user.create({data: {
    role: 3,
    username: "webmester",
    password: "$2a$12$DUB9D8a79PqaV6f8A2d05.JBuAGMAglctP5i8EjqVsjtTUq9nxyA2", // 1234
  }})

  await prisma.team.create({data: {
    name: "KandOS",
    category: { connect: { id: web.id }},
    programming_language: { connect: { id: (await prisma.programmingLanguage.findFirst({where: {name: "React"}})).id }},
    school: { connect: { id: kando.id }},
    members: { createMany: {data:[
      {name: "Váradi Marcell", grade: 13, substitute: false},
      {name: "Vincze Roland", grade: 12, substitute: false},
      {name: "Vezsenyi Roland" , grade: 13, substitute: false},
    ]}},
    teachers: ["Kátay Magdolna"],
    user: {create: {
      role: 1,
      username: "kandos",
      password: "$2a$12$DUB9D8a79PqaV6f8A2d05.JBuAGMAglctP5i8EjqVsjtTUq9nxyA2", // 1234
    }}
  }})

  await prisma.team.create({data: {
    name: "Techies",
    category: { connect: { id: mobil.id }},
    programming_language: { connect: { id: (await prisma.programmingLanguage.findFirst({where: {name: "React Native"}})).id }},
    school: { connect: { id: nagyk.id }},
    members: { createMany: {data:[
      {name: "Kovács Péter", grade: 12, substitute: false},
      {name: "Szabó Anna", grade: 11, substitute: false},
      {name: "Tóth Gábor" , grade: 13, substitute: false},
      {name: "Kiss József" , grade: 9, substitute: true},
    ]}},
    teachers: ["Nagy László"],
    user: {create: {
      role: 1,
      username: "techies",
      password: "$2a$12$DUB9D8a79PqaV6f8A2d05.JBuAGMAglctP5i8EjqVsjtTUq9nxyA2", // 1234
    }}
  }})

  await prisma.team.create({data: {
    name: "CodeMasters",
    category: { connect: { id: hagyom.id }},
    programming_language: { connect: { id: (await prisma.programmingLanguage.findFirst({where: {name: "Python"}})).id }},
    school: { connect: { id: bolyai.id }},
    members: { createMany: {data:[
      {name: "Németh Tamás", grade: 13, substitute: false},
      {name: "Kiss Júlia", grade: 12, substitute: false},
      {name: "Horváth Dávid" , grade: 13, substitute: false},
    ]}},
    teachers: ["Farkas Zoltán", "Kovács Péter"],
    user: {create: {
      role: 1,
      username: "codemasters",
      password: "$2a$12$DUB9D8a79PqaV6f8A2d05.JBuAGMAglctP5i8EjqVsjtTUq9nxyA2", // 1234
    }}
  }})
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })