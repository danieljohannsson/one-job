// /src/pages/JobSearchPage.tsx
import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import { useFetchJobs } from '../hooks/useFetchJobs';
import { fetchJobs } from '../api/jobsApi';

const JobSearchPage: React.FC = () => {

    // frontend/src/components/SearchBar.tsx
const handleEmailSubmit = async (email: string, role: string, location: string, company: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          role,
          location,
          company,
        }),
      });
      const result = await response.text();
      console.log(result);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

    return (
        <div className="job-search-page">
            <h1>Job Search</h1>
            <SearchBar onEmail={handleEmailSubmit} />
        </div>
    );
};

export default JobSearchPage;
