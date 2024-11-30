import { db } from "..";
import { companiesTable, jobRecommendationsTable, jobsTable, userPreferencesTable, usersTable } from "./schema";
import { eq } from "drizzle-orm";


  export const getJobsPrefferedByUser = async (userId: string) => {
    // Fetch jobs for the user
    const jobRecommendations = await db
    .select()
    .from(jobRecommendationsTable)
    .where(eq(jobRecommendationsTable.userId, userId));
    
    const jobs = [];

    for (const jobRecommendation of jobRecommendations) {
        const jobDetails = await db
        .select()
        .from(jobsTable)
        .where(eq(jobsTable.jobId, jobRecommendation.jobId)).limit(1);
        jobs.push(...jobDetails);
    }
    return jobs;
  };