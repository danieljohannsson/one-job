// backend/src/emailService.ts
import nodemailer from 'nodemailer';

// interface Job {
//   title: string;
//   company: string;
//   location: string;
//   link: string;
// }


export const sendEmail = async (jobs: any, email:string, role:string) => {
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
    <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f9f9f9; border-radius: 8px; border: 1px solid #e0e0e0;">
      <h1 style="text-align: center; color: #1a73e8; font-size: 24px;">Job Openings for ${role}</h1>
      <p style="text-align: center; color: #666; font-size: 16px;">Stay updated with the latest job opportunities based on your preferences.</p>
      <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
      <div style="padding: 10px 0;">
  `;

  // Loop through jobs and add each one to the email body
  jobs?.hits?.forEach((job:any) => {
    emailBody += `
      <div style="padding: 10px; margin-bottom: 20px; border-radius: 8px; background-color: #ffffff; border: 1px solid #e0e0e0;">
        <h2 style="font-size: 18px; color: #333;">${job.headline}</h2>
        <p style="color: #555;"><strong>Company:</strong> ${job.employer.name}</p>
        <p style="color: #555;"><strong>Location:</strong> ${job.workplace_addresses[0]?.municipality || 'N/A'}</p>
        <a href="${job.source_links[0]?.url}" style="color: #1a73e8; text-decoration: none; font-size: 14px;">View Job Posting</a>
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

