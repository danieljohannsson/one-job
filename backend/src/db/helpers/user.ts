import { db } from '../..';
import { usersTable } from '../schema';
import { eq } from 'drizzle-orm';

// Find or create a user
export const findOrCreateUser = async (email: string) => {
  let user = await db.select().from(usersTable)
    .where(eq(usersTable.email, email))
    .get();

  if (!user) {
    const insertedUser = await db.insert(usersTable)
      .values({ email })
      .returning();
    user = insertedUser[0];
  }

  return user;
};

export const getUsers = async () => {
      const database = await db;
      const users = await database.select().from(usersTable)
      console.log('Getting all users from the database: ', users)
      return users;
  };
    
    // Function to check if a user exists by email
    export const userExists = async (email: string): Promise<boolean> => {
        try {
            const database = await db;
          const result = await database
            .select({ id: usersTable.userId })
            .from(usersTable)
            .where(eq(usersTable.email, email))
            .limit(1);
      
          // Check if a result was returned
          return result.length > 0;
        } catch (error) {
          console.error('Error checking user existence:', error);
          throw new Error('Failed to check user existence.');
        }
      };