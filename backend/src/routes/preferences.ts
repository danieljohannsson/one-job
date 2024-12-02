import express from 'express';
import { postUserPreference } from '../controllers/preferencesController';

const router = express.Router();

/**
 * @swagger
 * /preferences/preference:
 *   post:
 *     summary: Create a user preference
 *     description: Add a new user preference for job alerts.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "user@example.com"
 *               role:
 *                 type: string
 *                 description: The job role the user is interested in.
 *                 example: "Software Engineer"
 *               location:
 *                 type: string
 *                 description: The location the user prefers for job openings.
 *                 example: "San Francisco"
 *               company:
 *                 type: string
 *                 description: The company the user is interested in.
 *                 example: "Google"
 *     responses:
 *       201:
 *         description: User preference created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: uuid
 *                   description: The unique ID of the created user preference.
 *                   example: 0d02ee55-058d-4957-9064-29f789f2991f
 *                 email:
 *                   type: string
 *                   description: The user's email address.
 *                   example: "user@example.com"
 *                 role:
 *                   type: string
 *                   description: The job role the user is interested in.
 *                   example: "Software Engineer"
 *                 location:
 *                   type: string
 *                   description: The location the user prefers for job openings.
 *                   example: "San Francisco"
 *                 company:
 *                   type: string
 *                   description: The company the user is interested in.
 *                   example: "Google"
 *       400:
 *         description: Bad request. Missing or invalid fields in the request body.
 *       500:
 *         description: Internal server error.
 */

router.post('/preference', postUserPreference);

export default router;
