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

export const fetchJobs = (query: string): Promise<Job[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filteredJobs = jobsData.filter(job =>
                job.title.toLowerCase().includes(query.toLowerCase()) ||
                job.company.toLowerCase().includes(query.toLowerCase()) ||
                job.location.toLowerCase().includes(query.toLowerCase())
            );
            resolve(filteredJobs);
        }, 1000); // Simulate network delay
    });
};
