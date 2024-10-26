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
}
