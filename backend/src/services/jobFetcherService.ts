import { db } from '..';
import { fetchJobTechJobs } from '../controllers/jobController';
import {
  companiesTable,
  jobRecommendationsTable,
  jobsTable,
  locationsTable,
  rolesTable,
  userPreferencesTable,
  usersTable,
} from '../db/schema';
import { eq } from 'drizzle-orm';

type Job = {
  title: string;
  companyName: string;
  location: string;
  url: string;
  roleName: string;
};

export const fetchAndStoreJobs = async () => {
  // Fetch all job preferences
  const preferences = await db
    .select({
      userId: userPreferencesTable.userId,
      roleName: rolesTable.roleName,
      companyName: companiesTable.companyName,
      locationName: locationsTable.locationName,
    })
    .from(userPreferencesTable)
    .innerJoin(rolesTable, eq(rolesTable.roleId, userPreferencesTable.roleId))
    .innerJoin(
      companiesTable,
      eq(companiesTable.companyId, userPreferencesTable.companyId),
    )
    .innerJoin(
      locationsTable,
      eq(locationsTable.locationId, userPreferencesTable.locationId),
    );

  for (const preference of preferences) {
    try {
      // Example external API call to fetch jobs
      const response = await fetchJobTechJobs(
        preference.roleName,
        preference.locationName,
        preference.companyName,
      );

      const jobs: Job[] = response; // Assume the API returns an array of jobs

      console.log(jobs);

      // Insert jobs into the database
      for (const job of jobs) {
        const jobRow = await db
          .insert(jobsTable)
          .values({
            title: job.title,
            companyName: job.companyName,
            location: job.location,
            url: job.url,
            role: job.roleName,
          })
          .returning();

        const jobId = jobRow[0].jobId;

        await db.insert(jobRecommendationsTable).values({
          jobId: jobId,
          userId: preference.userId,
        });
      }

      console.log(`Stored jobs for user ${preference.userId}`);
    } catch (error) {
      console.error(
        `Error inserting jobs for user ${preference.userId}:`,
        error,
      );
    }
  }
};
