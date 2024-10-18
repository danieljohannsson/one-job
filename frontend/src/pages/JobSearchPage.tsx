// /src/pages/JobSearchPage.tsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { useFetchJobs } from '../hooks/useFetchJobs';
import { fetchJobs } from '../api/jobsApi';

const JobSearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { jobs, loading } = useFetchJobs(searchQuery);
    const [JOBS, setJOBS] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetchJobs(searchQuery);
            setJOBS(result);
        };
        fetchData();
    }, [searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="job-search-page">
            <h1>Job Search</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            <div className="job-results">
                {JOBS.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
                {!loading && JOBS.length === 0 && <p>No jobs found. {JOBS.length}</p>}
            </div>
        </div>
    );
};

export default JobSearchPage;
