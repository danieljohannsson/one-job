// app.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import router from './routes/jobRoutes';
import { setupSwagger } from './swagger';
import cron from 'node-cron';
import { sendDailyJobRecommendations } from './controllers/jobsController';

dotenv.config();  // Load environment variables from .env file

// Create the Express application
const app = express();


// Middleware setup
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse incoming requests with JSON payloads
app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded data

// Setup Swagger UI
setupSwagger(app);

// Define routes
app.use('/api/jobs', router);

// Run the task daily at ...
const HOURS = '13';
const MINUTES = '10';
cron.schedule(`${MINUTES} ${HOURS} * * *`, async () => {
  console.log(`Running daily job recommendation task at ${HOURS}:${MINUTES}`);
  await sendDailyJobRecommendations();
});

// Error handling middleware (optional, for handling errors globally)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);  // Log the error
  res.status(500).json({ message: 'An error occurred!', error: err.message });
});

export default app;
