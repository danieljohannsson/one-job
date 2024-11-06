import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client'; // Import the SQLite client
import { usersTable } from './schema';
import { db } from '..';

// Open the database connection




// Function to store email and role
export const storeUser = async (email: string, role: string, location: string, company: string) => {
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

  export const fetchUsers = async () => {
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