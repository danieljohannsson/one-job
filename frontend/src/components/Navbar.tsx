import React from 'react';
import { Box, Flex, Heading, HStack, Text, Button } from '@chakra-ui/react';

const Navbar = () => {
  return (
    <Box
      as="nav"
      width="100%"
      px={6}
      py={4}
      bg="rgba(255, 255, 255, 0.8)"
      boxShadow="lg"
      borderBottom="1px solid rgba(255, 255, 255, 0.3)"
      backdropFilter="blur(10px)"
    >
      <Flex
        maxW="1200px"
        mx="auto"
        align="center"
        justify="space-between"
        wrap="wrap"
      >
        {/* Logo */}
        <HStack spacing={4}>
          {/* <Image src={logo} alt="1Job Logo" width="50px" /> */}
          <Heading
            as="h1"
            size="lg"
            color="blue.500"
            bgGradient="linear(to-r, blue.400, teal.300)"
            bgClip="text"
            fontWeight="bold"
            letterSpacing="wide"
          >
            1Job
          </Heading>
        </HStack>

        {/* Navigation Links */}
        <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
          <Text
            fontSize="lg"
            color="gray.700"
            _hover={{ color: 'blue.400', cursor: 'pointer' }}
          >
            Home
          </Text>
          <Text
            fontSize="lg"
            color="gray.700"
            _hover={{ color: 'blue.400', cursor: 'pointer' }}
          >
            Jobs
          </Text>
          <Text
            fontSize="lg"
            color="gray.700"
            _hover={{ color: 'blue.400', cursor: 'pointer' }}
          >
            About
          </Text>
          <Text
            fontSize="lg"
            color="gray.700"
            _hover={{ color: 'blue.400', cursor: 'pointer' }}
          >
            Contact
          </Text>
        </HStack>

        {/* Subscribe Button */}
        <Button
          display={{ base: 'none', md: 'inline-flex' }}
          colorScheme="teal"
          variant="solid"
          size="md"
          ml={4}
        >
          Subscribe
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
