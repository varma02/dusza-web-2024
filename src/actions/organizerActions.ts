'use server'

import { auth } from "@/auth";
import prisma from "@/lib/db";
import { parseZonedDateTime } from "@internationalized/date";

export async function organizerLoadDashboard() {
  const categories = await prisma.category.findMany({select: {id: true, name: true, valid_until: true, teams: {select: {_count: true}}}});
  const graph_data = await prisma.category.findMany({include: {teams: {select: {_count: true}}, programmingLanguages: {include: {teams: {select: {_count: true}}}}}});
  const environments = await prisma.category.findMany({select: {id: true, name: true, programmingLanguages: {select: {id: true, name: true}}}});
  return {categories, graph_data, environments};
}

export async function organizerLoadCategories() {
  const categories = await prisma.category.findMany({include: {programmingLanguages: true}});
  return categories;
}

export async function organizerLoadMessages() {
  const session = await auth()
  const messages = await prisma.message.findMany({ orderBy: { created_at: "asc" }, include: { author: true } });
  const teams = await prisma.team.findMany()

  return { messages, teams, user: session?.user };
}

export async function handleSendMessage(data: FormData) {
  const author_id = data.get("author_id") as string
  const recipient_id = data.get("recipient_id") as string
  const message = data.get("message") as string

  await prisma.message.create({ data: { author_id, recipient_id, message } })
}

export async function handleSendMessages(data: FormData) {
  const author_id = (await auth())!.user.id!
  const teams = JSON.parse(data.get("selected") as string) as string[]
  const message = data.get("message") as string

  await prisma.message.createMany({ data: teams.map(
    (team_id) => ({ message, author_id, recipient: {connect: {team: {id: team_id }}} })
  ) })
}

export async function handleCategoryUpdate(data: FormData) {
  const id = data.get("id") as string;
  const name = data.get("name") as string;
  const task = data.get("task") as string;
  const valid_until = parseZonedDateTime(data.get("valid_until") as string).toDate();
  if (id == "new_category") {
    await prisma.category.create({data: {name, task, valid_until, valid_from: new Date()}});
  } else {
    await prisma.category.update({where: {id}, data: {name, task, valid_until}});
  }
}

export async function handleCategoryDelete(id: string) {
  const category = await prisma.category.findUnique({where: {id}});
  if (!category) throw new Error("Category not found");
  await prisma.programmingLanguage.deleteMany({where: {category: {id: category.id}}});
  await prisma.category.delete({where: {id}});
}

export async function handleProgrammingLanguageUpdate(data: FormData) {
  const category_id = data.get("category_id") as string;
  const id = data.get("id") as string;
  const name = data.get("name") as string;
  if (id == "new_programming_language") {
    await prisma.programmingLanguage.create({data: {name, category: {connect: {id: category_id}}}});
  } else {
    await prisma.programmingLanguage.update({where: {id}, data: {name, category: {connect: {id: category_id}}}});
  }
}

export async function handleProgrammingLanguageDelete(id: string) {
  const category = await prisma.programmingLanguage.findUnique({where: {id}});
  if (!category) throw new Error("Programming language not found");
  await prisma.programmingLanguage.delete({where: {id}});
}

export async function organizerLoadRegistrations() {
  const teams = await prisma.team.findMany({
    include: {category: true, school: true, programming_language: true, members: true}
  });
  return teams;
}

export async function handleTeamDelete(data: FormData) {
  const selected = JSON.parse(data.get("selected") as string) as string[];
  await prisma.team.deleteMany({where: {id: {in: selected}}});
}

export async function handleTeamApprove(selected: string) {
  const parsed = JSON.parse(selected) as string[];
  await prisma.team.updateMany({where: {id: {in: parsed}}, data: {approved: true}});
}

export async function handleTeamDisapprove(selected: string) {
  const parsed = JSON.parse(selected) as string[];
  await prisma.team.updateMany({where: {id: {in: parsed}}, data: {approved: false}});
}