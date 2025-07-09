import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { booksTable } from "@/lib/schema";
import { BookPayload } from "@/lib/types";
import { redis } from "@/lib/db";

export async function listBooks() {
  return await db.select().from(booksTable)
}

export async function listBook(id: number) {
  const book = await redis.get("books:" + id)
  if (book)
    return book

  const [data] = await db.select().from(booksTable).where(eq(booksTable.id, id))
  redis.set("books:" + id, data, { ex: 60 * 60 })
  return data
}

export async function createBook({ title, author, content, category, publish_date }: BookPayload) {
  return await db.insert(booksTable).values({ title, author, content, category, publish_date })
}

export async function updateBook(id: number, { title, author, content, category, publish_date }: BookPayload) {
  return await db.update(booksTable).set({ title, author, content, category, publish_date }).where(eq(booksTable.id, id))
}

export async function deleteBook(id: number) {
  return await db.delete(booksTable).where(eq(booksTable.id, id))
}
