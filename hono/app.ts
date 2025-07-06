import { Hono } from "hono";

export default function main() {
  const app = new Hono();

  Bun.serve({
    port: 8080,
    fetch: app.fetch,
    hostname: "0.0.0.0"
  });
}
