// controllers/jobsController.ts
import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const JOB_API_URL = 'https://links.api.jobtechdev.se/joblinks';

// Helper function to fetch jobs using native fetch API
const fetchJobs = async (role: string, location: string, company: string) => {
  const url = new URL(JOB_API_URL);
  const params = {
    q: role,
    location: location,
    company: company,
  };

  // Append search parameters to the URL
  Object.keys(params).forEach(key =>
    url.searchParams.append(key, (params as any)[key])
  );

  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching jobs: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// Function to fetch jobs based on search criteria
export const searchJobs = async (req: Request, res: Response) => {
  const { role, location, company } = req.body;

  try {
    const jobs = await fetchJobs(role, location, company);
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
};

// Function to send job results via email
export const sendEmailResults = async (req: Request, res: Response) => {
  const { email, role, location, company } = req.body;

  try {
    // Fetch jobs based on search criteria
    const jobs = await fetchJobs(role, location, company);

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Prepare email body with job results
    let emailBody = `<h1>Job Openings for ${role}</h1>`;
    jobs?.hits?.forEach((job: any) => {
      emailBody += `<p><b>Title:</b> ${job.headline}<br/>`;
      emailBody += `<b>Company:</b> ${job.employer.name}<br/>`;
      emailBody += `<b>Location:</b> ${job.workplace_addresses[0]?.municipality}<br/>`;
      emailBody += `<b>URL:</b> ${job.source_links[0]?.url}<br/><br/></p>`;
    });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Job Openings for ${role}`,
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: `Job results sent to ${email}` });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error sending email' });
  }
};

export const sendHealth = async (req: Request, res: Response) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date(),
    });
}