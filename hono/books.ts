import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { booksTable } from "@/lib/schema";

const books = new Hono();

books
  .get("/", async c => {
    const books = await db.select().from(booksTable)
    return c.json(books)
  })
  .post(async c => {
    const { title, author, content, category, publish_date } = await c.req.json()
    await db.insert(booksTable).values({ title, author, content, category, publish_date })

    return c.json("OK", 201)
  })

books
  .get("/:id", async c => {
    const [book] = await db.select().from(booksTable).where(eq(booksTable.id, Number(c.req.param("id"))))
    return c.json(book)
  })
  .put(async c => {
    const { title, author, content, category, publish_date } = await c.req.json()
    await db.update(booksTable).set({ title, author, content, category, publish_date }).where(eq(booksTable.id, Number(c.req.param("id"))))

    return c.json("OK")
  })
  .delete(async c => {
    await db.delete(booksTable).where(eq(booksTable.id, Number(c.req.param("id"))))
    return c.json("OK")
  })

export default books;
