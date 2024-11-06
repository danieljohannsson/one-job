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
      await database.insert(usersTable).values(user);
      console.log(`Stored email: ${email}, role: ${role}, location: ${location} and company: ${company}`);
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