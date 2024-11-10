"use server"

import { z } from "zod"
import { auth, signIn, signOut } from "@/auth"
import prisma from "@/lib/db"
import { AuthError } from "next-auth"
import { signUpSchema } from "@/schemas/signUpSchema"
import { compareSync, hashSync } from "bcryptjs"
import { changePasswordSchema } from "@/schemas/changePasswordSchema"

export const handleCredentialsSignIn = async (
  {
    username,
    password
  } : { 
    username: string,
    password: string
  }
) => {
  try {
    await signIn("credentials", { username, password })
  } catch (error) {
    if (error instanceof AuthError && error.type === "CredentialsSignin") {
      return {
        message: "Helytelen felhasználónév és/vagy jelszó"
      }
    }
  }
}

export const handleChangePassword = async (values: z.infer<typeof changePasswordSchema>) => {
  try {
    const session = await auth()
    const user = await prisma.user.findUnique({ where: { id: session?.user.id } })

    if (!user) {
      return { message: "Felhasználó nem található" }
    }

    if (!compareSync(values.password, user.password)) {
      return { message: "Helytelen jelszó került megadásra" }
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashSync(values.newPassword)
      }
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      message: "Nem sikerült a jelszót megváltoztatni"
    }
  }
}

export const getSignUpProps = async () => {
  const schools = await prisma.school.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } })
  const categories = await prisma.category.findMany({
      select: { id: true, name: true },
      where: { valid_from: { lte: new Date() }, valid_until: { gt: new Date() }}
    }
  )
  const programmingLanguages = await prisma.programmingLanguage.findMany({ select: { id: true, name: true } })

  return { schools, categories, programmingLanguages }
}

export const handleSignUp = async (values: z.infer<typeof signUpSchema>) => {
  const { username, password, name, school, teachers, category, programming_language } = values

  try {
    const user = await prisma.user.create({ data: {
      username,
      password: hashSync(password, 10)
    } })

    const team = await prisma.team.create({
      data: {
        user_id: user.id, name, school_id: school, teachers: teachers.split(",").map(teacher => teacher.trim()).join(","), category_id: category, programming_language_id: programming_language,
      }
    })
  
    const data = [
      { name: values.member_1_name, grade: Number(values.member_1_grade), substitute: false, team_id: team.id },
      { name: values.member_2_name, grade: Number(values.member_2_grade), substitute: false, team_id: team.id },
      { name: values.member_3_name, grade: Number(values.member_3_grade), substitute: false, team_id: team.id }
    ]
  
    if (values.member_sub_name && values.member_sub_grade) {
      data.push({ name: values.member_sub_name, grade: Number(values.member_sub_grade), substitute: true, team_id: team.id })
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
  await signOut({
    redirectTo: "/signin"
  })
}