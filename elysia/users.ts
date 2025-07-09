import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { UserPayload } from "@/lib/types";
import { redis } from "@/lib/db";

export async function listUsers() {
  return await db.select().from(usersTable)
}

export async function listUser(id: number) {
  const user = await redis.get("users:" + id)
  if (user)
    return user

  const [data] = await db.select().from(usersTable).where(eq(usersTable.id, id))
  redis.set("users:" + id, data, { ex: 60 * 60 })
  return data
}

export async function createUser({ name, email, password }: UserPayload) {
  await db.insert(usersTable).values({ name, email, password })
}

export async function updateUser(id: number, { name, email, password }: UserPayload) {
  await db.update(usersTable).set({ name, email, password }).where(eq(usersTable.id, id))
  redis.del("users:" + id)
}

export async function deleteUser(id: number) {
  await db.delete(usersTable).where(eq(usersTable.id, id))
  redis.del("users:" + id)
}
