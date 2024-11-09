"use server"

import { signIn, signOut } from "@/auth"
import prisma from "@/lib/db"
import { AuthError } from "next-auth"
import { signUpSchema } from "@/schemas/signUpSchema"
import { hashSync } from "bcryptjs"

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
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return {
        message: "Helytelen felhasználónév és/vagy jelszó"
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

  const { username, password, name, school, teachers, category, programming_language } = parsedValues.data

  try {
    const user = await prisma.user.create({ data: {
      username,
      password: hashSync(password, 10)
    } })

    const team = await prisma.team.create({
      data: {
        user_id: user.id, name, school_id: school, teachers: teachers.trim().replace(', ', ','), category_id: category, programming_language_id: programming_language,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      message: "Már létezik felhasználó ezzel a névvel",
    }
  }
}

export const handleSignOut = async () => {
  await signOut()
}