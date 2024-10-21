// app.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jobsRoutes from './routes/jobRoutes';

dotenv.config();  // Load environment variables from .env file

// Create the Express application
const app = express();

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date(),
    });
});

// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data

// Define routes
app.use('/api/jobs', jobsRoutes);

// Error handling middleware (optional, for handling errors globally)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);  // Log the error
  res.status(500).json({ message: 'An error occurred!', error: err.message });
});

export default app;
