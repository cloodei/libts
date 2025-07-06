import { eq } from "drizzle-orm"
import { Request, Response } from "express"
import { db } from "@/lib/db"
import { booksTable } from "@/lib/schema"

export async function listBooks(req: Request, res: Response) {
  const books = await db.select().from(booksTable)
  return res.json(books)
}

export async function listBook(req: Request, res: Response) {
  const [book] = await db.select().from(booksTable).where(eq(booksTable.id, Number(req.params.id)))
  return res.json(book)
}

export async function createBook(req: Request, res: Response) {
  const { title, author, category, publish_date, content } = req.body
  await db.insert(booksTable).values({ title, author, category, publish_date, content })

  return res.status(201).json("OK")
}

export async function updateBook(req: Request, res: Response) {
  const { title, author, category, publish_date, content } = req.body
  await db.update(booksTable).set({ title, author, category, publish_date, content }).where(eq(booksTable.id, Number(req.params.id)))

  return res.json("OK")
}

export async function deleteBook(req: Request, res: Response) {
  await db.delete(booksTable).where(eq(booksTable.id, Number(req.params.id)))
  return res.json("OK")
}
