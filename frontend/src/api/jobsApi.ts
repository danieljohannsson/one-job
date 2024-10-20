// /src/api/jobsApi.ts
export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
}

export const fetchJobs = async (query: string): Promise<Job[]> => {
    try {
        const response = await fetch(`https://links.api.jobtechdev.se/joblinks?q=${query}`);
        if (!response.ok) {
            throw new Error(`Error fetching jobs: ${response.statusText}`);
        }

        const data = await response.json();

        // Assuming the API returns jobs in a format that matches the Job interface.
        // If not, you might need to map or transform the data here.
        const jobs: Job[] = data["hits"]?.map((job: any) => ({
            id: job.id,
            title: job.headline,
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