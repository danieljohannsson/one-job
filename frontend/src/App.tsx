// /src/App.tsx
import JobSearchPage from './pages/JobSearchPage';
import { ChakraProvider } from '@chakra-ui/react';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <ChakraProvider>
      <Navbar />
      <div className="app">
        <JobSearchPage />
      </div>
    </ChakraProvider>
  );
};

export default App;
