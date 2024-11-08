"use server"

import { signIn, signOut } from "@/auth"
import prisma from "@/lib/db"

import { AuthError } from "next-auth"
import { signUpSchema } from "@/schemas/signUpSchema"

export const handleCredentialsSignIn = async (
  {
    username,
    password
  } : { 
    username: string,
    password: string
  },
  callbackUrl?: string
) => {
  try {
    await signIn("credentials", { username, password, redirectTo: callbackUrl })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Helytelen adatok kerültek megadásra"
          }
        default:
          return {
            message: "Váratlan hiba történt"
          }
      }
    }

    throw error
  }
}

export const handleSignUp = async (values: unknown) => {
  const parsedValues = signUpSchema.safeParse(values)

  if (!parsedValues.success) return {
    message: "Hibás adatok kerültek megadásra!"
  }

  const { name, school, teachers, category, programming_language } = parsedValues.data

  const team = await prisma.team.create({
    data: {
      name, school_id: school, teachers: teachers.split(",").map(teacher => teacher.trim()), category_id: category, programming_language_id: programming_language, approved: false, approved_at: new Date(0)
    }
  })

  const data = [
    { name: parsedValues.data.member_1_name, grade: Number(parsedValues.data.member_1_grade), substitute: false, team_id: team.id },
    { name: parsedValues.data.member_2_name, grade: Number(parsedValues.data.member_2_grade), substitute: false, team_id: team.id },
    { name: parsedValues.data.member_3_name, grade: Number(parsedValues.data.member_3_grade), substitute: false, team_id: team.id }
  ]

  if (parsedValues.data.member_sub_name && parsedValues.data.member_sub_grade) {
    data.push({ name: parsedValues.data.member_sub_name, grade: Number(parsedValues.data.member_sub_grade), substitute: true, team_id: team.id })
  }

  await prisma.teamMember.createMany({ data })
}

export const handleSignOut = async () => {
  await signOut()
}