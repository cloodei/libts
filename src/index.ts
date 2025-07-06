import { Elysia, t } from "elysia";
import * as users from "./users";
import * as books from "./books";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .get("/users", users.listUsers())
  .get("/users/:id", async ({ params }) => await users.listUser(Number(params.id)))
  .post("/users", async ({ body }) => await users.createUser(body), {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
      password: t.String()
    })
  })
  .put("/users/:id", async ({ params, body }) => await users.updateUser(Number(params.id), body), {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
      password: t.String()
    })
  })
  .delete("/users/:id", async ({ params }) => await users.deleteUser(Number(params.id)))

  .get("/books", books.listBooks())
  .get("/books/:id", async ({ params }) => await books.listBook(Number(params.id)))
  .post("/books", async ({ body }) => await books.createBook(body), {
    body: t.Object({
      title: t.String(),
      author: t.String(),
      content: t.String(),
      category: t.String(),
      publish_date: t.String()
    })
  })
  .put("/books/:id", async ({ params, body }) => await books.updateBook(Number(params.id), body), {
    body: t.Object({
      title: t.String(),
      author: t.String(),
      content: t.String(),
      category: t.String(),
      publish_date: t.String()
    })
  })
  .delete("/books/:id", async ({ params }) => await books.deleteBook(Number(params.id)))
  .listen(3000);
