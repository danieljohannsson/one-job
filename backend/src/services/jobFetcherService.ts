import { db } from "..";
import { fetchJobs } from "../controllers/jobController";
import { companiesTable, jobsTable, locationsTable, rolesTable, userPreferencesTable, usersTable } from "../db/schema";
import { eq } from "drizzle-orm";


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
    .innerJoin(companiesTable, eq(companiesTable.companyId, userPreferencesTable.companyId))
    .innerJoin(locationsTable, eq(locationsTable.locationId, userPreferencesTable.locationId));

  for (const preference of preferences) {

    try {
      // Example external API call to fetch jobs
      const response = await fetchJobs(preference.roleName, preference.locationName, preference.companyName);

      const jobs = response.data; // Assume the API returns an array of jobs

      // Insert jobs into the database
      for (const job of jobs) {
        await db.insert(jobsTable).values({
          title: job.title,
          companyName: job.company,
          location: job.location,
          url: job.url,
          role: job.roleName,
        });
      }

      console.log(`Stored jobs for user ${preference.userId}`);
    } catch (error) {
      console.error(`Error fetching jobs for user ${preference.userId}:`, error);
    }
  }
};
