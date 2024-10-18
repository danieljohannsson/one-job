// /src/api/jobsApi.ts
export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
}

const jobsData: Job[] = [
    { id: 1, title: "Software Engineer", company: "Tech Corp", location: "New York, NY", description: "Develop and maintain software solutions." },
    { id: 2, title: "Frontend Developer", company: "Design Co", location: "Remote", description: "Work on user-facing web applications." },
    { id: 3, title: "Backend Developer", company: "API Solutions", location: "San Francisco, CA", description: "Build and optimize server-side logic." },
];

export const fetchJobs = async (query: string): Promise<Job[]> => {
    try {
        const response = await fetch(`https://links.api.jobtechdev.se/joblinksq?=systemutvecklare stockholm`);
        if (!response.ok) {
            throw new Error(`Error fetching jobs: ${response.statusText}`);
        }

        const data = await response.json();

        // Assuming the API returns jobs in a format that matches the Job interface.
        // If not, you might need to map or transform the data here.
        const jobs: Job[] = data["hits"].map((job: any) => ({
            id: job.id,
            title: job.title,
            company: job.employer.name,
            location: job.workplace_addresses?.[0]?.municipality,
            description: job.description
        }));
        console.log(`jobs` + jobs);

        return jobs;
    } catch (error) {
        console.error('Error fetching jobs:', error);
        return [];
    }
};