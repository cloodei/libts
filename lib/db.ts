import { Redis } from "@upstash/redis";
import { drizzle } from "drizzle-orm/postgres-js";

export const redis = Redis.fromEnv();
export const db = drizzle(process.env.DATABASE_URL!);
