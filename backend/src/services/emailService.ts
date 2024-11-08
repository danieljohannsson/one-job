// backend/src/emailService.ts
import nodemailer from 'nodemailer';

// interface Job {
//   title: string;
//   company: string;
//   location: string;
//   link: string;
// }

export const sendEmail = async (jobs: any, email: string, role: string) => {
  // Configure email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Prepare email body with job results
  let emailBody = `
    <div style="max-width: 500px; margin: auto; padding: 40px; font-family: Arial, sans-serif; background-color: rgba(255, 255, 255, 0.8); border-radius: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3);">
      <h1 style="text-align: center; font-size: 32px; font-weight: bold; color: #3182ce; background: linear-gradient(90deg, rgba(53, 138, 210, 1) 0%, rgba(72, 232, 185, 1) 100%); background-clip: text; color: transparent; letter-spacing: 2px; margin-bottom: 20px;">Job Alerts Subscription</h1>
      <p style="text-align: center; font-size: 16px; color: #555;">Stay updated with the latest job opportunities based on your preferences.</p>
      <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
      <div style="padding: 10px 0;">
  `;

  // Loop through jobs and add each one to the email body
  jobs?.hits?.forEach((job: any) => {
    emailBody += `
      <div style="padding: 20px; margin-bottom: 20px; border-radius: 10px; background-color: #ffffff; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); border: 1px solid #e0e0e0;">
        <h2 style="font-size: 20px; color: #333; font-weight: bold; margin-bottom: 10px;">${job.headline}</h2>
        <p style="color: #555; font-size: 14px;"><strong>Company:</strong> ${job.employer.name}</p>
        <p style="color: #555; font-size: 14px;"><strong>Location:</strong> ${job.workplace_addresses[0]?.municipality || job.workplace_addresses[0]?.region || 'N/A'}</p>
        <a href="${job.source_links[0]?.url}" style="color: transparent; background: linear-gradient(90deg, rgba(53, 138, 210, 1) 0%, rgba(72, 232, 185, 1) 100%); background-clip: text; text-decoration: none; font-size: 14px; font-weight: bold; display: inline-block;">View Job Posting</a>
      </div>
    `;
  });

  emailBody += `
      </div>
      <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="text-align: center; color: #888; font-size: 12px;">You are receiving this email because you subscribed to job alerts for <strong>${role}</strong> roles.</p>
    </div>
  `;

  // Send email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Job Openings for ${role}`,
    html: emailBody,
  };

  await transporter.sendMail(mailOptions);
};

