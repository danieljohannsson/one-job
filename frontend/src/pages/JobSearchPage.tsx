// /src/pages/JobSearchPage.tsx
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import { Box, Stack, Text } from '@chakra-ui/react';
import { handleEmailSubmit } from '../utils/emailService';

const JobSearchPage: React.FC = () => {
  // frontend/src/components/SearchBar.tsx
  return (
    <Box
      minHeight="100vh"
      backgroundColor="rgba(255, 255, 255, 0.8)"
      padding="6"
    >
      {/* Header */}
      <Header />

      {/* Job Search Form */}
      <Box maxWidth="600px" margin="0 auto">
        <SearchBar onEmail={handleEmailSubmit} />
      </Box>

      {/* Footer or additional content */}
      <Stack alignItems="center" marginTop="10">
        <Text color="gray.600">© 2024 1Job - All Rights Reserved</Text>
      </Stack>
    </Box>
  );
};

export default JobSearchPage;
