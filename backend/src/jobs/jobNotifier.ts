import cron from 'node-cron';
import { sendEmail } from '../services/emailService';
import { getJobsPrefferedByUser } from '../db/util';
import { getUsers } from '../db/helpers/user';

export const scheduleJobNotifier = async (hours: string, minutes: string) => {
    // Schedule the job to run daily at 8 AM
    cron.schedule(`${minutes} ${hours} * * *`,  async () => {
        console.log(`Running daily job recommendation task at ${hours}:${minutes}`);
        await fetchAndNotifyUsers();
        });

    console.log('Job notification cron scheduled.');
    };

const fetchAndNotifyUsers = async () => {
    // Fetch all users
    const users = await getUsers();
  
    for (const user of users) {
      try {
        const jobs = await getJobsPrefferedByUser(user.userId);
        console.log(jobs);
  
      //Prepare email subject
      const subject = 'Daily Job Recommendations';
      let roles = '';
  
      // Prepare email body with job results
      let emailContent = `
      <div style="max-width: 500px; margin: auto; padding: 40px; font-family: Arial, sans-serif; background-color: rgba(255, 255, 255, 0.8); border-radius: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3);">
        <h1 style="text-align: center; font-size: 32px; font-weight: bold; color: #3182ce; background: linear-gradient(90deg, rgba(53, 138, 210, 1) 0%, rgba(72, 232, 185, 1) 100%); background-clip: text; color: transparent; letter-spacing: 2px; margin-bottom: 20px;">Job Alerts Subscription</h1>
        <p style="text-align: center; font-size: 16px; color: #555;">Stay updated with the latest job opportunities based on your preferences.</p>
        <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
        <div style="padding: 10px 0;">
    `;
  
    // Loop through jobs and add each one to the email body
    jobs.forEach((job: any) => {
      emailContent += `
        <div style="padding: 20px; margin-bottom: 20px; border-radius: 10px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border: 1px solid #e0e0e0;">
          <h2 style="font-size: 20px; color: #333; font-weight: bold; margin-bottom: 10px;">${job.title}</h2>
          <p style="color: #555; font-size: 14px;"><strong>Company:</strong> ${job.companyName}</p>
          <p style="color: #555; font-size: 14px;"><strong>Location:</strong> ${job.location}</p>
          <a href="${job.url}" style="color: transparent; background: linear-gradient(90deg, rgba(53, 138, 210, 1) 0%, rgba(72, 232, 185, 1) 100%); background-clip: text; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block;">View Job Posting</a>
        </div>
      `;
      roles += job.role;
    });
  
    emailContent += `
        </div>
        <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; color: #888; font-size: 12px;">You are receiving this email because you subscribed to daily job alerts for <strong>${roles}</strong> roles.</p>
      </div>
    `;
        // Send the email
        await sendEmail(user.email, subject, emailContent);
        console.log(`Email sent to ${user.email}`);
      } catch (error) {
        console.error(`Failed to notify user ${user.email}:`, error);
      }
    }
  };  