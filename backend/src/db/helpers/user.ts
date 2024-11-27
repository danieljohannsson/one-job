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