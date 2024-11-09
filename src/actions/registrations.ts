'use server'

import prisma from "@/lib/db";

export async function organizerLoadDashboard() {
  const categories = await prisma.category.findMany({select: {id: true, name: true, valid_until: true, teams: {select: {_count: true}}}});
  const graph_data = await prisma.category.findMany({include: {programmingLanguages: {include: {teams: {select: {_count: true}}}}}});
  return {categories, graph_data};
}

export async function organizerLoadRegistrations() {
  const teams = await prisma.team.findMany({
    include: {category: true, school: true, programming_language: true, members: true}
  });
  return teams;
}

export async function handleHiánypótlás(formData: FormData) {
  const selected = JSON.parse(formData.get("selected") as string) as string[];
  const message = formData.get("message") as string;
  
  const temp = selected.map((team_id) => ({
    team_id,
    message,
    type: "hiánypótlás"
  }))
  console.log(temp, selected, message);
  
  await prisma.notifications.createMany({data: [...temp]});
}