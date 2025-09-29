import { Elysia, t } from "elysia";
import * as users from "./users";
import * as books from "./books";
import * as borrow from "./borrow";

export default function main() {
  new Elysia({ precompile: true, prefix: "/api" })
    .get("/users", users.listUsers)
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
  
    .get("/books", books.listBooks)
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
  
    .get("/borrows", borrow.listBorrows)
    .get("/borrows/:user_id/:book_id", async ({ params }) => (await borrow.listBorrowByID(Number(params.user_id), Number(params.book_id)))[0])
    .get("/borrows/books/:user_id", async ({ params }) => await borrow.listBorrowByUserID(Number(params.user_id)))
    .get("/borrows/users/:book_id", async ({ params }) => await borrow.listBorrowByBookID(Number(params.book_id)))
    .post("/borrows", async ({ body }) => await borrow.createBorrow(body), {
      body: t.Object({
        user_id: t.Number(),
        book_id: t.Number(),
        borrow_date: t.String()
      })
    })
    .listen({ port: 8080, hostname: "0.0.0.0" });
}
