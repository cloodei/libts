import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";

const users = new Hono();

users
  .get("/", async c => {
    const users = await db.select().from(usersTable)
    return c.json(users)
  })
  .post(async c => {
    const { name, email, password } = await c.req.json()
    await db.insert(usersTable).values({ name, email, password })

    return c.json("OK", 201)
  })

users
  .get("/:id", async c => {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, Number(c.req.param("id"))))
    return c.json(user)
  })
  .put(async c => {
    const { name, email, password } = await c.req.json()
    await db.update(usersTable).set({ name, email, password }).where(eq(usersTable.id, Number(c.req.param("id"))))

    return c.json("OK")
  })
  .delete(async c => {
    await db.delete(usersTable).where(eq(usersTable.id, Number(c.req.param("id"))))
    return c.json("OK")
  })

export default users;
