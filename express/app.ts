import express from "express";
import * as users from "./users";
import * as books from "./books";
import * as borrow from "./borrow";

export default function main() {
  const app = express();

  app.get("/api/users", users.listUsers as any);
  app.get("/api/users/:id", users.listUser as any);
  app.post("/api/users", users.createUser as any);
  app.put("/api/users/:id", users.updateUser as any);
  app.delete("/api/users/:id", users.deleteUser as any);

  app.get("/api/books", books.listBooks as any);
  app.get("/api/books/:id", books.listBook as any);
  app.post("/api/books", books.createBook as any);
  app.put("/api/books/:id", books.updateBook as any);
  app.delete("/api/books/:id", books.deleteBook as any);

  app.get("/api/borrows", borrow.listBorrows as any);
  app.get("/api/borrows/:user_id/:book_id", borrow.listBorrow as any);
  app.get("/api/borrows/users/:book_id", borrow.listBorrowByBookID as any);
  app.get("/api/borrows/books/:user_id", borrow.listBorrowByUserID as any);
  app.post("/api/borrows", borrow.createBorrow as any);

  app.listen(8080);
}
