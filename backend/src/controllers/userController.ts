import { Request, Response } from 'express';
import { usersTable } from '../db/schema';
import { db } from '..';

// Function to store email and role
export const createUser = async (email: string, role: string, location: string, company: string) => {
    try {
      const database = await db;
      
      const user: typeof usersTable.$inferInsert = {
        email: email,
        role: role,
        location: location,
        company: company
      };
      const result = await database.insert(usersTable).values(user);
      console.log(`Stored email: ${email}, role: ${role}, location: ${location} and company: ${company}`);
      const userId = result.lastInsertRowid; // Adjust this based on how your DB driver returns the ID
      console.log('User added with ID:', userId);
      return userId;
    } catch (error) {
      console.error('Error storing user preferences:', error);
    }
  };

  export const getUsers = async () => {
    try {
      const database = await db;
      const users = await database.select().from(usersTable);
      console.log('Getting all users from the database: ', users)
      return users;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  };

  export const users = async (req: Request, res: Response) => {
    console.log('/users was called')
    try {
      const users = await getUsers();
      res.status(200).json( users );
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving data' });
    }
}