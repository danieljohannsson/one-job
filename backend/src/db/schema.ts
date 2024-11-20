import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, primaryKey
 } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  userId: integer('user_id').primaryKey({autoIncrement: true}),
  email: text('email').notNull().unique(),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const roles = sqliteTable('roles', {
  roleId: integer('role_id').primaryKey({autoIncrement: true}),
  roleName: text('role_name').notNull().unique(),
});

export const locations = sqliteTable('locations', {
  locationId: integer('location_id').primaryKey({autoIncrement: true}),
  locationName: text('location_name').notNull().unique(),
});

export const companies = sqliteTable('companies', {
  companyId: integer('company_id').primaryKey({autoIncrement: true}),
  companyName: text('company_name').notNull().unique(),
});


export const userPreferences = sqliteTable('user_preferences', {
  preferenceId: integer('preference_id').primaryKey({autoIncrement: true}),
  userId: integer('user_id').references(() => users.userId, { onDelete: 'cascade' }).notNull(),
  roleId: integer('role_id').references(() => roles.roleId),
  locationId: integer('location_id').references(() => locations.locationId),
  companyId: integer('company_id').references(() => companies.companyId),
}
);

export const jobs = sqliteTable('jobs', {
  jobId: integer('job_id').primaryKey({autoIncrement: true}),
  title: text('title').notNull(),
  companyName: text('company_name'),
  location: text('location'),
  role: text('role'),
  url: text('url'), // Link to the job posting
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
});

export const jobRecommendations = sqliteTable('job_recommendations', {
  recommendationId: integer('recommendation_id').primaryKey({autoIncrement: true}),
  sentAt: text('sent_at').default('CURRENT_TIMESTAMP'),
  userId: integer("user_id")
    .references(() => users.userId, { onDelete: 'cascade' }) // Set up the foreign key reference
    .notNull(),
  jobId: integer("job_id").references(() => jobs.jobId).notNull(),
}
);