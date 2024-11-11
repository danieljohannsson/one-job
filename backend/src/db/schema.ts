import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Users table with an auto-generated ID
export const usersTable = sqliteTable("users_table", {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }), // Auto-generated ID column
  email: text("email").notNull(),
  role: text("role").notNull(),
  location: text("location").notNull(),
  company: text("company").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now', 'localtime'))`).notNull()
});

// Companies table with an auto-generated ID
export const companiesTable = sqliteTable("companies_table", {
  id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }), // Auto-generated ID column
  name: text("name").notNull().unique(), // Example column for company name
  industry: text("industry"), // Example column for industry type
  userId: integer("user_id")
    .references(() => usersTable.id) // Set up the foreign key reference
    .notNull()
});