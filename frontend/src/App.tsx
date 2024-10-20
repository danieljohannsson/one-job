// /src/App.tsx
import React from 'react';
import JobSearchPage from './pages/JobSearchPage';
import { ChakraProvider } from '@chakra-ui/react';

const App: React.FC = () => {
    return (
        <ChakraProvider>
        <div className="app">
            <JobSearchPage />
        </div>
        </ChakraProvider>
    );
};

export default App;
