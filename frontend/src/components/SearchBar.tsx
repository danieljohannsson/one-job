// SearchBar.tsx
import React, { useState } from 'react';
import { Input, Button, Stack } from '@chakra-ui/react';

interface SearchBarProps {
  onEmail: (email: string, role: string, location: string, company: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onEmail }) => {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEmail(email, role, location, company);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4} mb="4">
        <Input
          value={role}
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter job role..."
          size="lg"
          borderRadius="md"
        />
        <Input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location..."
          size="lg"
          borderRadius="md"
        />
        <Input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter company name..."
          size="lg"
          borderRadius="md"
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address..."
          size="lg"
          borderRadius="md"
        />
        <Button type="submit" colorScheme="blue" size="lg">
          Email results
        </Button>
      </Stack>
    </form>
  );
};

export default SearchBar;
