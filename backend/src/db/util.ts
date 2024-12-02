import { db } from '..';
import { Job } from '../types/job';
import {
  companiesTable,
  jobRecommendationsTable,
  jobsTable,
  userPreferencesTable,
  usersTable,
} from './schema';
import { eq } from 'drizzle-orm';

export const getJobsPrefferedByUser = async (userId: string) => {
  // Fetch jobs for the user
  const jobRecommendations = await db
    .select()
    .from(jobRecommendationsTable)
    .where(eq(jobRecommendationsTable.userId, userId));

  const jobs: Job[] = [];

  for (const jobRecommendation of jobRecommendations) {
    const jobResult = await db
      .select()
      .from(jobsTable)
      .where(eq(jobsTable.jobId, jobRecommendation.jobId))
      .limit(1);
    const job: Job = jobResult[0];
    jobs.push(job);
  }
  return jobs;
};
