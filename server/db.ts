import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-serverless";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";
import { existsSync } from "fs";

const hasEnv = existsSync(".env");

if (!process.env.DATABASE_URL) {
  const msg = hasEnv
    ? "DATABASE_URL is not set. Did you forget to add it to your .env file?"
    :
        "DATABASE_URL is not set. Create a .env file in the project root based on .env.example";
  throw new Error(msg);
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql as any, { schema } as any);

