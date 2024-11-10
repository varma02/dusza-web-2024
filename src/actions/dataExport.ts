"use server"

import xlsx from "json-as-xlsx";
import { stringify } from 'csv-stringify/sync';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const ExportToFile = async (
    type: "xlsx" | "csv",
    rawFields: string[]
) => {
    const fields: { name: string; key: string; }[] = [];

    for (const F of rawFields) {
        fields.push(JSON.parse(F));
    }

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

    const finalFields: { label: string, key: string }[] = [];

    for (const Field of fields) {
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

    console.log(teams)

    const content = teams.map((team) => {
        return {
            id: team.id,
            name: team.name,
            schoolName: team.school.name,
            schoolAddress: team.school.address,
            schoolContactEmail: team.school.contact_email,
            schoolContactName: team.school.contact_name,
            schoolRegistered: new Date(team.school.created_at).toDateString(),
            teachers: team.teachers,
            member1Name: team.members[0]?.name || "",
            member1Grade: team.members[0]?.grade || "",
            member2Name: team.members[1]?.name || "",
            member2Grade: team.members[1]?.grade || "",
            member3Name: team.members[2]?.name || "",
            member3Grade: team.members[2]?.grade || "",
            member4Name: team.members.find((m) => m.substitute)?.name || "",
            member4Grade: team.members.find((m) => m.substitute)?.grade || "",
            category: team.category.name,
            programmingLanguage: team.programming_language.name,
            registered_at: new Date(team.created_at).toDateString(),
            approved: team.approved ? 'Jóváhagyva' : 'Nem lett jóváhagyva',
            approved_by_school: team.approved_by_school ? 'Jóváhagyta' : 'Nem hagyta jóvá'
        };
    });

    let r: Buffer | undefined;

    if (type === "csv") {
        const csv = stringify([
            finalFields.map(x => x.label),
            ...content.map(x => {
                const r: string[] = [];

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                for (const [_key, val] of Object.entries(x)) {
                    r.push(val.toString())
                }
                
                return r
            })
        ]);

        console.log(csv);

        r = Buffer.from(csv);
    } else if (type === "xlsx") {
        console.log({
            sheet: "Csapatok",
            columns: finalFields.map(x => ({ label: x.label, value: x.key })),
            content
        })

        const xlsxData = [
            {
                sheet: "Csapatok",
                columns: finalFields.map(x => ({ label: x.label, value: x.key })),
                content
            }
        ];
        
        r = xlsx(xlsxData, {
            fileName: "Csapatok_export",
            extraLength: 3, // Adjust column width if necessary
            writeOptions: {} // Additional options can go here if needed
        });

        console.log(r)
    }

    if (r == undefined) {
        return new Blob()
    }

    return new Blob([r])
}
