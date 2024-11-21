// controllers/jobsController.ts
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { sendEmail } from '../services/emailService';
import { createCompany, createUser } from '../db/util';

dotenv.config();

const JOB_API_URL = 'https://links.api.jobtechdev.se/joblinks';

// Helper function to fetch jobs using native fetch API
const fetchJobs = async (role: string, location: string, company: string = '') => {
  const url = new URL(JOB_API_URL);
  const params = {
    q: `${role} ${location} ${company}`,
    sort: 'relevance',
  };

  // Append search parameters to the URL
  Object.keys(params).forEach(key =>
    url.searchParams.append(key, (params as any)[key])
  );

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching jobs: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(data)
  return data;
};

// Function to fetch jobs based on search criteria
export const searchJobs = async (req: Request, res: Response) => {
  console.log('/search was called')
  const { role, location, company } = req.body;

  try {
    const jobs = await fetchJobs(role, location, company);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Function to send job results via email
export const sendEmailResults = async (req: Request, res: Response) => {
  console.log('/send-email was called')
  const { email, role, location, company } = req.body;

  try {
    // Fetch jobs based on search criteria
    const jobs = await fetchJobs(role, location, company);

    // Send email with job results
    await sendEmail(jobs, email, role);

    const userId = await createUser(email);

    await createCompany(company, Number(userId))

    res.status(200).json({ message: `Job results sent to ${email}` });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error sending email' });
  }
};

export const sendDailyJobRecommendations = async () => {
  try {
    // Fetch all emails and roles from SQLite
    const users = await getUsers();

    if (users.length === 0) {
      console.log('No users to send recommendations to.');
      return;
    }

    // Loop through each user and send job recommendations
    for (const { users_table: { email, role, location} } of users) {
      try {
        // Fetch jobs based on the role
        const jobs = await fetchJobs(role, location);

        await sendEmail(jobs, email, role);

        console.log(`Job recommendations sent to ${email}`);
      } catch (error) {
        console.error(`Failed to send jobs to ${email}`);
      }
    }
  } catch (error) {
    console.error('Error sending daily job recommendations:', error);
  }
};