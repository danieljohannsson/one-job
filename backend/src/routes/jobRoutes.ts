// routes/jobs.ts
import express, { Request, Response } from 'express';
import { searchJobs, sendEmailResults,  } from '../controllers/jobController';
import { users } from '../controllers/userController';
import { companies } from '../controllers/companyController';

const router = express.Router();

export const sendHealth = async (req: Request, res: Response) => {
    console.log('/health or / was called')
      res.status(200).json({
          status: 'OK',
          timestamp: new Date(),
      });
  }
/**
 * @swagger
 * /api/jobs/health:
 *   get:
 *     summary: Health check of the API
 *     description: Returns a 200 status if the API is running.
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "OK"
 */
router.get(['/', '/health'], sendHealth);

/**
 * @swagger
 * /api/jobs/search:
 *   post:
 *     summary: Search for jobs
 *     description: Search for job openings by role, location, and company.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 description: Job role to search for
 *                 example: "Software Engineer"
 *               location:
 *                 type: string
 *                 description: Location to search for
 *                 example: "San Francisco"
 *               company:
 *                 type: string
 *                 description: Company name to search for
 *                 example: "Google"
 *     responses:
 *       200:
 *         description: A list of job openings matching the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid search parameters"
 */
router.post('/search', searchJobs);

/**
 * @swagger
 * /api/jobs/send-email:
 *   post:
 *     summary: Send job search results via email
 *     description: Sends the results of a job search to a given email address. The request body must include role, location, company, and email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *               - location
 *               - company
 *               - email
 *             properties:
 *               role:
 *                 type: string
 *                 description: The job role for which results were searched
 *                 example: "Software Engineer"
 *               location:
 *                 type: string
 *                 description: The job location for which results were searched
 *                 example: "San Francisco"
 *               company:
 *                 type: string
 *                 description: The company name for which results were searched
 *                 example: "Google"
 *               email:
 *                 type: string
 *                 description: The email address to send the job results to
 *                 example: "user@example.com"
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Job results sent successfully to user@example.com"
 *       400:
 *         description: Invalid request data (e.g., missing role, location, company, or email)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request: Missing required fields"
 */
router.post('/send-email', sendEmailResults);

/**
 * @swagger
 * /api/jobs/users:
 *   get:
 *     summary: Get all users
 *     description: Fetch all users who have signed up for job alerts.
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   email:
 *                     type: string
 *                     description: The user's email address
 *                     example: "user@example.com"
 *                   role:
 *                     type: string
 *                     description: The job role the user is interested in
 *                     example: "Software Engineer"
 *                   location:
 *                     type: string
 *                     description: The location the user prefers for job openings
 *                     example: "New York"
 *                   company:
 *                     type: string
 *                     description: The company the user is interested in
 *                     example: "Google"
 */

router.get('/users', users);

/**
 * @swagger
 * /api/jobs/companies:
 *   get:
 *     summary: Get a list of companies
 *     description: Retrieves a list of all companies in the database.
 *     responses:
 *       200:
 *         description: A list of companies.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The unique identifier of the company.
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The name of the company.
 *                     example: "TechCorp"
 *                   userId:
 *                     type: integer
 *                     description: The ID of the user associated with the company.
 *                     example: 42
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An error occurred while retrieving companies."
 */
router.get('/companies', companies);

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The job ID
 *         title:
 *           type: string
 *           description: Job title
 *           example: "Software Engineer"
 *         location:
 *           type: string
 *           description: Job location
 *           example: "San Francisco"
 *         company:
 *           type: string
 *           description: The company offering the job
 *           example: "Google"
 */

export default router;
