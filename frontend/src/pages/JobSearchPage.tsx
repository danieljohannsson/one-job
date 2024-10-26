// /src/pages/JobSearchPage.tsx
import SearchBar from '../components/SearchBar';

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
            <SearchBar onEmail={handleEmailSubmit} />
        </div>
    );
};

export default JobSearchPage;
