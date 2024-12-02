import { sql } from 'drizzle-orm';
import {
  sqliteTable,
  text,
  integer,
  primaryKey,
  check,
} from 'drizzle-orm/sqlite-core';
import { v4 as uuidv4 } from 'uuid';

export const usersTable = sqliteTable(
  'users',
  {
    userId: text('user_id')
      .primaryKey()
      .$defaultFn(() => uuidv4()),
    email: text('email').notNull().unique(),
    createdAt: text('created_at').default(sql`(datetime('now', 'localtime'))`),
  },
  (table) => ({
    checkConstraint: check('email_check', sql`email LIKE '%@%.%'`),
  }),
);

export const rolesTable = sqliteTable('roles', {
  roleId: text('role_id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  roleName: text('role_name').notNull().unique(),
});

export const locationsTable = sqliteTable('locations', {
  locationId: text('location_id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  locationName: text('location_name').notNull().unique(),
});

export const companiesTable = sqliteTable('companies', {
  companyId: text('company_id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  companyName: text('company_name').notNull().unique(),
});

export const userPreferencesTable = sqliteTable('user_preferences', {
  preferenceId: text('preference_id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userId: text('user_id')
    .references(() => usersTable.userId, { onDelete: 'cascade' })
    .notNull(),
  roleId: text('role_id').references(() => rolesTable.roleId),
  locationId: text('location_id').references(() => locationsTable.locationId),
  companyId: text('company_id').references(() => companiesTable.companyId),
});

export const jobsTable = sqliteTable('jobs', {
  jobId: text('job_id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  title: text('title').notNull(),
  companyName: text('company_name'),
  location: text('location'),
  roleName: text('role'),
  url: text('url'), // Link to the job posting
  createdAt: text('created_at').default(sql`(datetime('now', 'localtime'))`),
});

export const jobRecommendationsTable = sqliteTable('job_recommendations', {
  recommendationId: text('recommendation_id')
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  sentAt: text('sent_at').default(sql`(datetime('now', 'localtime'))`),
  userId: text('user_id')
    .references(() => usersTable.userId, { onDelete: 'cascade' }) // Set up the foreign key reference
    .notNull(),
  jobId: text('job_id')
    .references(() => jobsTable.jobId)
    .notNull(),
});
