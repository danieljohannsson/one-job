// backend/src/emailService.ts
import nodemailer from 'nodemailer';

interface Job {
  title: string;
  company: string;
  location: string;
  link: string;
}

// Function to send job openings via email
export const sendJobResults = async (email: string, jobs: Job[]) => {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // or any email service
    auth: {
      user: 'daniel.johannsson1999@gmail.com',
      pass: 'password',
    },
  });

  // Generate the email body from the job listings
  const jobListHTML = jobs
    .map(
      (job) => `
      <div>
        <h3>${job.title} - ${job.company}</h3>
        <p>Location: ${job.location}</p>
        <p>Link: <a href="${job.link}">Apply Here</a></p>
      </div><br/>
    `
    )
    .join('');

  // Send email
  try {
    await transporter.sendMail({
      from: '"Job Search App" <your-email@gmail.com>',
      to: email,
      subject: 'Your Job Search Results',
      html: `
        <h2>Here are the job openings you requested:</h2>
        ${jobListHTML}
      `,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
