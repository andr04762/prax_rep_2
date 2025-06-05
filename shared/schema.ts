import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql, InferModel, InferInsertModel } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  name: text("name"),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(strftime('%s','now') * 1000)`),
});

export type User = InferModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;
