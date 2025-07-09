import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { booksTable } from "@/lib/schema";
import { redis } from "@/lib/db";

const books = new Hono();

books
  .get("/", async c => {
    let books = await redis.get("books:all")
    if (books)
      return c.text(books as string, 200, { "Content-Type": "application/json" })

    const data = JSON.stringify(await db.select().from(booksTable))
    redis.set("books:all", data, { ex: 60 * 60 })
    return c.text(data, 200, { "Content-Type": "application/json" })
  })
  .post(async c => {
    const { title, author, content, category, publish_date } = await c.req.json()
    await db.insert(booksTable).values({ title, author, content, category, publish_date })

    redis.del("books:all")
    return c.json("OK", 201)
  })

books
  .get("/:id", async c => {
    let book = await redis.get("books:" + c.req.param("id"))
    if (book)
      return c.text(book as string, 200, { "Content-Type": "application/json" })

    const data = JSON.stringify(await db.select().from(booksTable).where(eq(booksTable.id, Number(c.req.param("id")))))
    redis.set("books:" + c.req.param("id"), data, { ex: 60 * 60 })
    return c.text(data, 200, { "Content-Type": "application/json" })
  })
  .put(async c => {
    const { title, author, content, category, publish_date } = await c.req.json()
    await db.update(booksTable).set({ title, author, content, category, publish_date }).where(eq(booksTable.id, Number(c.req.param("id"))))

    redis.del("books:" + c.req.param("id"))
    redis.del("books:all")
    return c.json("OK")
  })
  .delete(async c => {
    await db.delete(booksTable).where(eq(booksTable.id, Number(c.req.param("id"))))
    redis.del("books:" + c.req.param("id"))
    redis.del("books:all")
    
    return c.json("OK")
  })

export default books;
