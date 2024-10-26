import React, { useState } from 'react';
import { Input, Button, Stack, useToast, Box, Heading, Grid, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { AtSignIcon, Search2Icon, InfoOutlineIcon } from '@chakra-ui/icons';

interface SearchBarProps {
  onEmail: (email: string, role: string, location: string, company: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onEmail }) => {
  const [role, setRole] = useState('');
  const [location, setLocation] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onEmail(email, role, location, company);
      toast({
        title: 'Subscribed!',
        description: 'You will receive job alerts based on your preferences.',
        status: 'success',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="500px"
      mx="auto"
      mt={10}
      px={6}
      py={8}
      bg="rgba(255, 255, 255, 0.2)"
      boxShadow="lg"
      borderRadius="2xl"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.3)"
    >
      <Heading
        as="h1"
        size="lg"
        textAlign="center"
        mb={8}
        color="blue.500"
        bgGradient="linear(to-r, blue.400, teal.300)"
        bgClip="text"
        fontWeight="bold"
        letterSpacing="wide"
      >
        Job Alerts Subscription
      </Heading>

      <form onSubmit={handleSubmit}>
        <Grid templateColumns="1fr" gap={6}>
          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<Search2Icon color="gray.300" />} />
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Job Role (e.g., Frontend Developer)"
              size="lg"
              focusBorderColor="blue.400"
              bg="whiteAlpha.700"
              borderRadius="full"
              _hover={{ bg: 'whiteAlpha.800' }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<InfoOutlineIcon color="gray.300" />} />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location (e.g., New York)"
              size="lg"
              focusBorderColor="blue.400"
              bg="whiteAlpha.700"
              borderRadius="full"
              _hover={{ bg: 'whiteAlpha.800' }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<InfoOutlineIcon color="gray.300" />} />
            <Input
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Company (e.g., Google)"
              size="lg"
              focusBorderColor="blue.400"
              bg="whiteAlpha.700"
              borderRadius="full"
              _hover={{ bg: 'whiteAlpha.800' }}
            />
          </InputGroup>

          <InputGroup>
            <InputLeftElement pointerEvents="none" children={<AtSignIcon color="gray.300" />} />
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email Address"
              size="lg"
              type="email"
              focusBorderColor="blue.400"
              bg="whiteAlpha.700"
              borderRadius="full"
              _hover={{ bg: 'whiteAlpha.800' }}
            />
          </InputGroup>

          <Button
            type="submit"
            isLoading={loading}
            loadingText="Subscribing"
            size="lg"
            borderRadius="full"
            bgGradient="linear(to-r, blue.400, teal.400)"
            color="white"
            _hover={{ bgGradient: 'linear(to-r, blue.500, teal.500)' }}
            boxShadow="lg"
          >
            Subscribe
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default SearchBar;