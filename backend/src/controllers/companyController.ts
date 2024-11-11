import { Request, Response } from 'express';
import { companiesTable } from '../db/schema';
import { db } from '..';

// Function to store email and role
export const createCompany = async (companyName: string, userId: number) => {
    try {
      const database = await db;
      
      const company: typeof companiesTable.$inferInsert = {
        name: companyName,
        userId: userId
      };
      const result = await database.insert(companiesTable).values(company);

      const companyId = result.lastInsertRowid; // Adjust this based on how your DB driver returns the ID
      
      console.log('Company added with ID:', companyId);
      
      return companyId;
    } catch (error) {
      console.error('Error storing company:', error);
    }
  };

  export const getCompanies = async () => {
    try {
      const database = await db; 
      
      const companies = await database.select().from(companiesTable);
      
      console.log('Getting all companies from the database: ', companies)
      
      return companies;
    
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  };

  export const companies = async (req: Request, res: Response) => {
    console.log('/companies was called')
    try {
      const companies = await getCompanies();
      console.log(companies)
      res.status(200).json( companies );
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving data' });
    }
}