// routes/jobs.ts
import express from 'express';
import { searchJobs, sendEmailResults } from '../controllers/jobsController';

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date(),
    });
})

// POST /api/jobs/search -> To search for jobs
router.post('/search', searchJobs);

// POST /api/jobs/send-email -> To send job results via email
router.post('/send-email', sendEmailResults);

export default router;
