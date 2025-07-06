import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { UserPayload } from "./types";

export async function listUsers() {
  return await db.select().from(usersTable)
}

export async function listUser(id: number) {
  return await db.select().from(usersTable).where(eq(usersTable.id, id))
}

export async function createUser({ name, email, password }: UserPayload) {
  return await db.insert(usersTable).values({ name, email, password })
}

export async function updateUser(id: number, { name, email, password }: UserPayload) {
  return await db.update(usersTable).set({ name, email, password }).where(eq(usersTable.id, id))
}

export async function deleteUser(id: number) {
  return await db.delete(usersTable).where(eq(usersTable.id, id))
}
