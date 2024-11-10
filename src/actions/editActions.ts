"use server"

import prisma from "@/lib/db"
import { teamEditSchema } from "@/schemas/teamEditSchema"
import { TeamMember } from "@prisma/client"

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