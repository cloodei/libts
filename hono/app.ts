import { Hono } from "hono";
import users from "./users";
import books from "./books";
import borrow from "./borrow";

export default function main() {
  const app = new Hono().basePath("/api");

  app.route("/users", users);
  app.route("/books", books);
  app.route("/borrows", borrow);

  Bun.serve({
    port: 8080,
    fetch: app.fetch,
    hostname: "0.0.0.0"
  });
}
