// controllers/jobsController.ts
import dotenv from 'dotenv';
import { title } from 'process';

dotenv.config();

type Job = {
  title: string;
  companyName: string;
  location: string;
  url: string;
  roleName: string;
};

// Helper function to fetch jobs using native fetch API
export const fetchJobTechJobs = async (
  role: string,
  location: string,
  company: string = '',
) => {
  const JOB_API_URL = 'https://links.api.jobtechdev.se/joblinks';
  const url = new URL(JOB_API_URL);
  const params = {
    q: `${role} ${location} ${company}`,
    sort: 'relevance',
  };

  // Append search parameters to the URL
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, (params as any)[key]),
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
  console.log(data);
  const results: Job[] = data.hits.map((hit: any) => ({
    title: hit.headline,
    companyName: hit.employer?.name,
    location: hit.workplace_addresses[0]?.municipality,
    url: hit.source_links[0]?.url,
    roleName: hit.occupation_field?.label,
  }));
  console.log('Results :' + results);
  return results;
};
// export const sendDailyJobRecommendations = async () => {
//   try {
//     // Fetch all emails and roles from SQLite
//     const users = await getUsers();

//     if (users.length === 0) {
//       console.log('No users to send recommendations to.');
//       return;
//     }

//     // Loop through each user and send job recommendations
//     for (const { users_table: { email, role, location} } of users) {
//       try {
//         // Fetch jobs based on the role
//         const jobs = await fetchJobs(role, location);

//         await sendEmail(jobs, email, role);

//         console.log(`Job recommendations sent to ${email}`);
//       } catch (error) {
//         console.error(`Failed to send jobs to ${email}`);
//       }
//     }
//   } catch (error) {
//     console.error('Error sending daily job recommendations:', error);
//   }
// };
