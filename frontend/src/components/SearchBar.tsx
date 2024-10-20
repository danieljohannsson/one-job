// /src/components/SearchBar.tsx
import React, { useState } from 'react';
import { Input, Button, Stack } from '@chakra-ui/react';

interface SearchBarProps {
    onSearch: (role: string, location: string, company: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [role, setRole] = useState('');
    const [location, setLocation] = useState('');
    const [company, setCompany] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(role, location, company);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={4} mb="4">
                <Input
                    value={role}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRole(e.target.value)}
                    placeholder="Enter job role..."
                    size="lg"
                    borderRadius="md"
                />
                <Input
                    value={location}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLocation(e.target.value)}
                    placeholder="Enter location..."
                    size="lg"
                    borderRadius="md"
                />
                <Input
                    value={company}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                    placeholder="Enter company name..."
                    size="lg"
                    borderRadius="md"
                />
                <Button type="submit" colorScheme="blue" size="lg">
                    Search
                </Button>
            </Stack>
        </form>
    );
};

export default SearchBar;
