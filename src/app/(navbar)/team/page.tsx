import prisma from "@/lib/db"
import { auth } from "@/auth"

import { TeamEditPage } from "@/components/team-edit-page"

const TeamPage = async () => {
  const session = await auth()

  const team = await prisma.team.findUnique({ where: { user_id: session?.user.id }})
  const teamMembers = await prisma.teamMember.findMany({ where: { team_id: team?.id }})
  const categories = await prisma.category.findMany({ where: { valid_from: { lte: new Date() }, valid_until: { gt: new Date() }}})
  const programmingLanguages = await prisma.programmingLanguage.findMany()

  return (
    <TeamEditPage
      team={team}
      teamMembers={teamMembers}
      categories={categories}
      programmingLanguages={programmingLanguages}
    />
  )
}

export default TeamPage