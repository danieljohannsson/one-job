// /src/pages/JobSearchPage.tsx
import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';
import { useFetchJobs } from '../hooks/useFetchJobs';

const JobSearchPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const { jobs, loading } = useFetchJobs(searchQuery);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    return (
        <div className="job-search-page">
            <h1>Job Search</h1>
            <SearchBar onSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            <div className="job-results">
                {jobs.map(job => (
                    <JobCard key={job.id} job={job} />
                ))}
                {!loading && jobs.length === 0 && <p>No jobs found.</p>}
            </div>
        </div>
    );
};

export default JobSearchPage;
