import React from 'react';
import { Box, Heading, Stack, Text, Image } from '@chakra-ui/react';
import logo from '../assets/1Job.webp';

const Header = () => {
  return (
    <Box
      maxW="100%"
      mx="auto"
      px={6}
      py={8}
      bg="rgba(255, 255, 255, 0.2)"
      boxShadow="lg"
      borderRadius="2xl"
      backdropFilter="blur(10px)"
      border="1px solid rgba(255, 255, 255, 0.3)"
      textAlign="center"
      mb={10}
    >
      {/* Logo */}
      {/* <Stack align="center" mb={4}>
      <Image src={logo} alt="1Job Logo" width="100px" mb="4" />
      </Stack> */}

      {/* Header Title */}
      <Heading
        as="h1"
        size="xl"
        color="blue.500"
        bgGradient="linear(to-r, blue.400, teal.300)"
        bgClip="text"
        fontWeight="bold"
        letterSpacing="wide"
        mb={2}
      >
        All Jobs in One Place
      </Heading>

      {/* Description */}
      <Text fontSize="lg" color="gray.500" mb={4}>
        Subscribe to job alerts based on job role, location, and company.
      </Text>
    </Box>
  );
};

export default Header;
