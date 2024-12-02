import { Request, Response } from 'express';
import { getCompanies } from '../db/helpers/company';

// Function to store email and role
export const companies = async (req: Request, res: Response) => {
  console.log('/companies was called');
  try {
    const companies = await getCompanies();
    console.log(companies);
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving data' });
  }
};
