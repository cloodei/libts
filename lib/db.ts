import { SQL } from "bun";
import { drizzle } from "drizzle-orm/postgres-js";

export const db = drizzle(process.env.DATABASE_URL!);
export const sql = new SQL(process.env.DATABASE_URL!);
