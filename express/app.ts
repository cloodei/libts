import express from "express";
import * as users from "./users";
import * as books from "./books";
import * as borrow from "./borrow";

export default function main() {
  const app = express();
  app.use(express.json());

  app.get("/api/users", users.listUsers);
  app.get("/api/users/:id", users.listUser);
  app.post("/api/users", users.createUser);
  app.put("/api/users/:id", users.updateUser);
  app.delete("/api/users/:id", users.deleteUser);

  app.get("/api/books", books.listBooks);
  app.get("/api/books/:id", books.listBook);
  app.post("/api/books", books.createBook);
  app.put("/api/books/:id", books.updateBook);
  app.delete("/api/books/:id", books.deleteBook);

  app.get("/api/borrows", borrow.listBorrows);
  app.get("/api/borrows/:user_id/:book_id", borrow.listBorrow);
  app.get("/api/borrows/users/:book_id", borrow.listBorrowByBookID);
  app.get("/api/borrows/books/:user_id", borrow.listBorrowByUserID);
  app.post("/api/borrows", borrow.createBorrow);

  app.listen(8080);
}
