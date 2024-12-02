import cron from 'node-cron';
import { fetchAndStoreJobs } from '../services/jobFetcherService';

export const scheduleJobPuller = async (hours: string, minutes: string) => {
  // Schedule the job to run daily at 6 AM
  cron.schedule(`${minutes} ${hours} * * *`, async () => {
    console.log('Fetching jobs for user preferences...');
    try {
      await fetchAndStoreJobs();
      console.log('Job fetching completed successfully.');
    } catch (error) {
      console.error('Error during job fetching:', error);
    }
  });

  console.log('Job fetching cron scheduled.');
};
