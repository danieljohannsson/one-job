import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const usersTable = sqliteTable("users_table", {
  email: text().notNull().unique().primaryKey(),
  role: text().notNull(),
  location: text().notNull(),
  company: text().notNull(),
  createdAt: text().default(sql`(datetime('now', 'localtime'))`).notNull()
});