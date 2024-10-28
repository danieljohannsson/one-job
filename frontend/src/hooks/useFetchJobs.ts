// /src/hooks/useFetchJobs.ts
import { useState, useEffect } from 'react';
import { fetchJobs, Job } from '../api/jobsApi';

export const useFetchJobs = (query: string) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetchJobs(query).then((jobs) => {
        setJobs(jobs);
        setLoading(false);
      });
    }
  }, [query]);

  return { jobs, loading };
};
