import { Hono } from "hono";
import { and, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { borrowTable, usersTable, booksTable } from "@/lib/schema";

const borrow = new Hono();

borrow
  .get("/", async c => {
    const borrow = await db
      .select({
        username: usersTable.name,
        title: booksTable.title,
        publish_date: booksTable.publish_date,
        borrow_date: borrowTable.borrow_date
      })
      .from(borrowTable)
      .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
      .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))

    return c.json(borrow)
  })
  .post(async c => {
    const { book_id, user_id, borrow_date } = await c.req.json()
    await db.insert(borrowTable).values({ book_id, user_id, borrow_date })

    return c.json("OK", 201)
  })

borrow.get("/:user_id/:book_id", async c => {
  const [borrow] = await db
    .select({
      username: usersTable.name,
      title: booksTable.title,
      publish_date: booksTable.publish_date,
      borrow_date: borrowTable.borrow_date
    })
    .from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(and(eq(borrowTable.user_id, Number(c.req.param("user_id"))), eq(borrowTable.book_id, Number(c.req.param("book_id")))))

  return c.json(borrow)
})

borrow.get("/users/:user_id", async c => {
  const borrow = await db
    .select({
      username: usersTable.name,
      title: booksTable.title,
      publish_date: booksTable.publish_date,
      borrow_date: borrowTable.borrow_date
    })
    .from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(eq(borrowTable.user_id, Number(c.req.param("user_id"))))

  return c.json(borrow)
})

borrow.get("/books/:book_id", async c => {
  const borrow = await db
    .select({
      username: usersTable.name,
      title: booksTable.title,
      publish_date: booksTable.publish_date,
      borrow_date: borrowTable.borrow_date
    })
    .from(borrowTable)
    .innerJoin(usersTable, eq(borrowTable.user_id, usersTable.id))
    .innerJoin(booksTable, eq(borrowTable.book_id, booksTable.id))
    .where(eq(borrowTable.book_id, Number(c.req.param("book_id"))))

  return c.json(borrow)
})

export default borrow;
