import { Hono } from "hono";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/schema";
import { redis } from "@/lib/db";

const users = new Hono();

users
  .get("/", async c => {
    let users = await redis.get("users:all")
    if (users)
      return c.json(users)

    const data = JSON.stringify(await db.select().from(usersTable))
    redis.set("users:all", data, { ex: 60 * 60 })
    return c.text(data, 200, { "Content-Type": "application/json" })
  })
  .post(async c => {
    const { name, email, password } = await c.req.json()
    await db.insert(usersTable).values({ name, email, password })

    redis.del("users:all")
    return c.json("OK", 201)
  })

users
  .get("/:id", async c => {
    const id = c.req.param("id")
    let user = await redis.get("users:" + id)
    if (user)
      return c.json(user)

    const data = JSON.stringify(await db.select().from(usersTable).where(eq(usersTable.id, Number(id))))
    redis.set("users:" + id, data, { ex: 60 * 60 })
    return c.text(data, 200, { "Content-Type": "application/json" })
  })
  .put(async c => {
    const { name, email, password } = await c.req.json()
    await db.update(usersTable).set({ name, email, password }).where(eq(usersTable.id, Number(c.req.param("id"))))

    redis.del("users:" + c.req.param("id"))
    redis.del("users:all")
    return c.json("OK")
  })
  .delete(async c => {
    await db.delete(usersTable).where(eq(usersTable.id, Number(c.req.param("id"))))
    redis.del("users:" + c.req.param("id"))
    redis.del("users:all")

    return c.json("OK")
  })

export default users;
