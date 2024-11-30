import express from 'express';
import { users } from '../controllers/userController';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetch all users who have signed up, including their basic details.
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
 *                   userId:
 *                     type: uuid
 *                     description: The unique identifier for the user.
 *                     example: 329bff25-d547-4f43-8eda-712657575217
 *                   email:
 *                     type: string
 *                     description: The user's email address.
 *                     example: "user@example.com"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the user was created.
 *                     example: "2024-11-20T15:30:00Z"
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: "Internal server error."
 */


router.get('/', users);


export default router;