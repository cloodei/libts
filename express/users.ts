import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";

export async function listUsers(req: Request, res: Response) {
  const users = await db.select().from(usersTable)
  return res.json(users)
}

export async function listUser(req: Request, res: Response) {
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, Number(req.params.id)))
  return res.json(user)
}

export async function createUser(req: Request, res: Response) {
  const { name, email, password } = req.body
  await db.insert(usersTable).values({ name, email, password })

  return res.status(201).json("OK")
}

export async function updateUser(req: Request, res: Response) {
  const { name, email, password } = req.body
  await db.update(usersTable).set({ name, email, password }).where(eq(usersTable.id, Number(req.params.id)))

  return res.json("OK")
}

export async function deleteUser(req: Request, res: Response) {
  await db.delete(usersTable).where(eq(usersTable.id, Number(req.params.id)))
  return res.json("OK")
}

