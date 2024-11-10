"use server"

import prisma from "@/lib/db"
import { hashSync } from "bcryptjs"
import { newSchoolSchema } from "@/schemas/newSchoolSchema"

export const organizerLoadSchools = async () => {
  const schools = await prisma.school.findMany({
    select: { id: true, name: true, address: true, contact_name: true, contact_email: true }
  })

  return schools
}

export const handleAddSchool = async (values: unknown) => {
  const parsedValues = newSchoolSchema.safeParse(values)

  if (!parsedValues.success) return {
    message: "Hibás adatok kerültek megadásra!"
  }

  const { username, password, name, address, contact_name, contact_email } = parsedValues.data

  let userId = ""
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashSync(password, 10),
        role: 2
      }
    })
    userId = user.id
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      message: "Már létezik felhasználó ezzel a névvel"
    }
  }

  try {
    await prisma.school.create({
      data: {
        name,
        address,
        contact_name,
        contact_email,
        user_id: userId
      }
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log(error)
    return {
      message: "Nem sikerült új iskolát hozzáadni"
    }
  }
}

export const handleDelSchool = async (ids: string[]) => {
  try {
    ids.forEach(async (id) => {
      await prisma.school.delete({ where: { id } })
    })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      message: "Nem sikerült az iskolák törlése"
    }
  }
}