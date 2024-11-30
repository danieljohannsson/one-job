import { Request, Response } from 'express';
import { findOrCreateUser } from '../db/helpers/user';
import { findOrCreateRole } from '../db/helpers/role';
import { findOrCreateLocation } from '../db/helpers/location';
import { findOrCreateCompany } from '../db/helpers/company';
import { insertUserPreference } from '../db/helpers/preference';

  export const postUserPreference = async (req: Request, res: Response) => {
    console.log('/userPreferences/userPreference was called');
    const { email, role, location, company } = req.body;
  
    try {
      // Find or create user
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