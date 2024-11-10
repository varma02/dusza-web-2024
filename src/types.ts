export enum UserRole {
  "TeamMember" = 1,
  "School",
  "Organizer",
}

export interface MenuItem {
  href: string,
  label: string,
  roles: UserRole[]
}

export const ExportFields = [
  { name: "Azonosító", key: "id" },
  { name: "Csapatnév", key: "name" },
  { name: "Iskola neve", key: "schoolName" },
  { name: "Iskola címe", key: "schoolAddress" },
  { name: "Iskolai kapcsolattartó elérhetősége", key: "schoolContactEmail" },
  { name: "Iskolai kapcsolattartó neve", key: "schoolContactName" },
  { name: "Iskola regisztrálva", key: "schoolRegistered" },
  { name: "Felkészítők", key: "teachers" },
  { name: "1. csapattag neve", key: "member1Name" },
  { name: "1. csapattag osztálya", key: "member1Grade" },
  { name: "2. csapattag neve", key: "member2Name" },
  { name: "2. csapattag osztálya", key: "member2Grade" },
  { name: "3. csapattag neve", key: "member3Name" },
  { name: "3. csapattag osztálya", key: "member3Grade" },
  { name: "Pót tag neve", key: "member4Name" },
  { name: "Pót tag osztálya", key: "member4Grade" },
  { name: "Kategória", key: "category" },
  { name: "Programozási nyelv", key: "programmingLanguage" },
  { name: "Regisztrálva", key: "registered_at" },
  { name: "Jóváhagyva", key: "approved" },
  { name: "Iskola jóváhagyta", key: "approved_by_school" }
];