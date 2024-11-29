"use server"

import prisma from "@/lib/db"
import { auth } from "@/auth"
import { teamEditSchema } from "@/schemas/teamEditSchema"
import { TeamMember } from "@prisma/client"

export const loadTeams = async () => {
  const session = await auth()

  const team = await prisma.team.findUnique({ where: { user_id: session?.user.id }})

  const teamMembers = await prisma.teamMember.findMany({ where: { team_id: team?.id }})
  const fixMembers = teamMembers.filter(member => !member.substitute)
  const subMember = teamMembers.find(member => member.substitute)

  const categories = await prisma.category.findMany()
  const category = categories.find(category => team?.category_id === category.id)
  const progLangs = await prisma.programmingLanguage.findMany()
  const progLang = progLangs.find(language => team?.programming_language_id === language.id)

  return { team, teamMembers: [ ...fixMembers, subMember ], categories: categories.filter(categ => categ.valid_until >= new Date() || categ.id === team?.category_id), category, progLangs, progLang }
}

export const loadMessages = async () => {
  const session = await auth();
  const messagesSent = await prisma.message.findMany({ where: { author_id: session?.user.id }, orderBy: { created_at: "asc" } });
  const messagesReceived = await prisma.message.findMany({ where: { recipient_id: session?.user.id }, orderBy: { created_at: "asc" }, include: { author: true } });

  return { messages: [ ...messagesSent, ...messagesReceived ].sort((a, b) => a.created_at - b.created_at) };
}

export async function handleSendMessage(data: FormData) {
  const author_id = data.get("author_id") as string
  const message = data.get("message") as string

  await prisma.message.create({ data: { author_id, message } })
}

export const handleTeamEdit = async ({
  id,
  teamMembers,
  values
} : {
  id: string | undefined,
  teamMembers: (TeamMember|undefined)[]
  values: unknown
}) => {
  const parsedValues = teamEditSchema.safeParse(values)

  if (!id || !parsedValues.success) return {
    message: "Hibás adatok kerültek megadásra!"
  }

  const { teachers, category, programming_language } = parsedValues.data

  try {
    await prisma.team.update({
      where: { id },
      data: {
        teachers: teachers.split(",").map(teacher => teacher.trim()).join(","),
        category_id: category,
        programming_language_id: programming_language
      }
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error)

    return {
      message: "Nem sikerült a csapatot szerkeszteni"
    }
  }

  if (teamMembers.at(0)?.id) {
    try {
      await prisma.teamMember.update({
        where: { id: teamMembers.at(0)?.id },
        data: {
          name: parsedValues.data.member_1_name,
          grade: Number(parsedValues.data.member_1_grade)
        }
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        message: "Nem sikerült a csapatot szerkeszteni"
      }
    }
  }

  if (teamMembers.at(1)?.id) {
    try {
      await prisma.teamMember.update({
        where: { id: teamMembers.at(1)?.id },
        data: {
          name: parsedValues.data.member_2_name,
          grade: Number(parsedValues.data.member_2_grade)
        }
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        message: "Nem sikerült a csapatot szerkeszteni"
      }
    }
  }

  if (teamMembers.at(2)?.id) {
    try {
      await prisma.teamMember.update({
        where: { id: teamMembers.at(2)?.id },
        data: {
          name: parsedValues.data.member_3_name,
          grade: Number(parsedValues.data.member_3_grade)
        }
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        message: "Nem sikerült a csapatot szerkeszteni"
      }
    }
  }

  if (teamMembers.at(3)?.id) {
    try {
      await prisma.teamMember.update({
        where: { id: teamMembers.at(3)?.id },
        data: {
          name: parsedValues.data.member_sub_name,
          grade: Number(parsedValues.data.member_sub_grade)
        }
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        message: "Nem sikerült a csapatot szerkeszteni"
      }
    }
  } else {
    try {
      await prisma.teamMember.create({
        data: {
          id: teamMembers.at(3)?.id,
          name: String(parsedValues.data.member_sub_name),
          grade: Number(parsedValues.data.member_sub_grade),
          substitute: true,
          team_id: id
        }
      })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        message: "Nem sikerült a csapatot szerkeszteni"
      }
    }
  }
}

export const loadTask = async () => {
  const session = await auth()

  const user = await prisma.user.findUnique({ where: { id: session?.user.id }, include: { team: true } })
  const category = await prisma.category.findUnique({ where: { id: user?.team?.category_id } })

  return category
}