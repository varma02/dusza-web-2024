import xlsx from "json-as-xlsx";
import { json2csv } from 'json-2-csv';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const ExportToFile = async (
    type: "xlsx" | "csv",
    fields: { name: string; key: string; }[]
) => {
    const teams = await prisma.team.findMany({
        include: {
            category: {
                select: {
                    name: true
                }
            },
            members: {
                select: {
                    name: true,
                    grade: true,
                    substitute: true,
                }
            },
            programming_language: {
                select: {
                    name: true
                }
            },
            school: true
        }
    });

    let finalFields: { label: string, key: string }[] = [];
    let content: { [key: string]: string | number | boolean }[] = [];

    for (let Field of fields) {
        if (Field.key == "schoolDetails") {
            finalFields.push(
                { label: "Iskola címe", key: "schoolAddress" },
                { label: "Iskolai kapcsolattartó elérhetősége", key: "schoolContactEmail" },
                { label: "Iskolai kapcsolattartó neve", key: "schoolContactName" },
                { label: "Iskola regisztrálva", key: "schoolRegistered" }
            );
        } else if (Field.key == "teamMembers") {
            finalFields.push(
                { label: "1. csapattag neve", key: "member1Name" },
                { label: "1. csapattag osztálya", key: "member1Grade" },
                { label: "2. csapattag neve", key: "member2Name" },
                { label: "2. csapattag osztálya", key: "member2Grade" },
                { label: "3. csapattag neve", key: "member3Name" },
                { label: "3. csapattag osztálya", key: "member3Grade" },
                { label: "Pót tag neve", key: "member4Name" },
                { label: "Pót tag osztálya", key: "member4Grade" }
            );
        } else {
            finalFields.push({ label: Field.name, key: Field.key });
        }
    }

    for (let Team of teams) {
        let rowData: { [key: string]: string } = {};
        for (let Field of finalFields) {
            switch (Field.key) {
                case "id":
                    rowData[Field.key] = Team.id;
                    break;
                case "name":
                    rowData[Field.key] = Team.name;
                    break;
                case "schoolName":
                    rowData[Field.key] = Team.school.name;
                    break;
                case "schoolAddress":
                    rowData[Field.key] = Team.school.address;
                    break;
                case "schoolContactEmail":
                    rowData[Field.key] = Team.school.contact_email;
                    break;
                case "schoolContactName":
                    rowData[Field.key] = Team.school.contact_name;
                    break;
                case "schoolRegistered":
                    rowData[Field.key] = new Date(Team.school.created_at).toDateString();
                    break;
                case "teachers":
                    rowData[Field.key] = Team.teachers;
                    break;
                case "member1Name":
                    rowData[Field.key] = Team.members[0]?.name || "";
                    break;
                case "member1Grade":
                    rowData[Field.key] = Team.members[0]?.grade.toString() || "";
                    break;
                case "member2Name":
                    rowData[Field.key] = Team.members[1]?.name || "";
                    break;
                case "member2Grade":
                    rowData[Field.key] = Team.members[1]?.grade.toString() || "";
                    break;
                case "member3Name":
                    rowData[Field.key] = Team.members[2]?.name || "";
                    break;
                case "member3Grade":
                    rowData[Field.key] = Team.members[2]?.grade.toString() || "";
                    break;
                case "member4Name":
                    rowData[Field.key] = Team.members.find(member => member.substitute)?.name || "";
                    break;
                case "member4Grade":
                    rowData[Field.key] = Team.members.find(member => member.substitute)?.grade.toString() || "";
                    break;
                case "category":
                    rowData[Field.key] = Team.category.name;
                    break;
                case "programmingLanguage":
                    rowData[Field.key] = Team.programming_language.name;
                    break;
                case "registered_at":
                    rowData[Field.key] = new Date(Team.created_at).toDateString();
                    break;
                case "approved":
                    rowData[Field.key] = Team.approved ? 'Jóváhagyva' : 'Nem lett jóváhagyva';
                    break;
                case "approved_by_school":
                    rowData[Field.key] = Team.approved_by_school ? 'Jóváhagyta' : 'Nem hagyta jóvá';
                    break;
            }
        }

        content.push(rowData);
    }

    if (type === "csv") {
        const csv = json2csv(content);

        console.log(csv);

        return Buffer.from(csv);
    } else if (type === "xlsx") {
        const xlsxData = [
            {
                sheet: "Teams",
                columns: finalFields.map(x => ({ label: x.label, value: x.key })),
                content
            }
        ];
        
        const r = xlsx(xlsxData, {
            fileName: "Teams_Export",
            extraLength: 3, // Adjust column width if necessary
            writeOptions: {} // Additional options can go here if needed
        });

        return r;
    }
}
