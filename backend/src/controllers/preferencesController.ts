import { Request, Response } from 'express';
import { findOrCreateUser, userExists } from '../db/helpers/user';
import { findOrCreateRole } from '../db/helpers/role';
import { findOrCreateLocation } from '../db/helpers/location';
import { findOrCreateCompany } from '../db/helpers/company';
import { insertUserPreference } from '../db/helpers/preference';
import { send } from 'process';
import { sendEmail } from '../services/emailService';

  export const postUserPreference = async (req: Request, res: Response) => {
    console.log('/userPreferences/userPreference was called');
    const { email, role, location, company } = req.body;
  
    try {
      // Find or create user
      if (await !userExists(email)) {
                // Prepare email subject
        const subject = 'Welcome to Job Alerts Subscription';

        // Prepare email body for signup confirmation
        const emailContent = `
        <div style="max-width: 500px; margin: auto; padding: 40px; font-family: Arial, sans-serif; background-color: rgba(255, 255, 255, 0.8); border-radius: 20px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.3);">
          <h1 style="text-align: center; font-size: 32px; font-weight: bold; color: #3182ce; background: linear-gradient(90deg, rgba(53, 138, 210, 1) 0%, rgba(72, 232, 185, 1) 100%); background-clip: text; color: transparent; letter-spacing: 2px; margin-bottom: 20px;">Welcome Aboard!</h1>
          <p style="text-align: center; font-size: 16px; color: #555;">Thank you for signing up for Job Alerts Subscription. We're thrilled to have you with us.</p>
          <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
          <div style="padding: 10px 0;">
            <p style="color: #555; font-size: 14px;">Here's what you can expect:</p>
            <ul style="padding-left: 20px; font-size: 14px; color: #555;">
              <li>Daily updates on job opportunities tailored to your preferences.</li>
              <li>Insights into top companies hiring for roles you care about.</li>
              <li>Personalized recommendations delivered straight to your inbox.</li>
            </ul>
          </div>
          <hr style="border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="text-align: center; color: #888; font-size: 12px;">We’re here to help you find your dream job. Feel free to <a href="mailto:support@example.com" style="color: #3182ce;">contact us</a> anytime.</p>
        </div>
        `;

        sendEmail(email, subject, emailContent);
      }
      const user = await findOrCreateUser(email);
  
      // Find or create role, location, company
      const roleRecord = await findOrCreateRole(role);
      const locationRecord = await findOrCreateLocation(location);
      const companyRecord = await findOrCreateCompany(company);
  
      // Insert user preference
      const userPreference = await insertUserPreference(
        user.userId,
        roleRecord.roleId,
        locationRecord.locationId,
        companyRecord.companyId
      );
  
      res.status(201).json(userPreference);
  
    } catch (error) {
      console.error('Error creating user preference:', error);
      res.status(500).json({ error: 'Error creating user preference' });
    }
}