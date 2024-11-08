import prisma from "@/lib/db"
import { SignUpCard } from "@/components/signup-card"

const SignUpPage = async () => {
  const schools = await prisma.school.findMany({ select: { id: true, name: true }, orderBy: { name: "asc" } })
  const categories = await prisma.category.findMany({
    select:
      { id: true, name: true },
      where: {
        valid_from: { lte: new Date() },
        valid_until: { gt: new Date() }
      }
    }
  )
  const programmingLanguages = await prisma.programmingLanguage.findMany({ select: { id: true, name: true } })

  return <SignUpCard schools={schools} categories={categories} programmingLanguages={programmingLanguages} />
}

export default SignUpPage