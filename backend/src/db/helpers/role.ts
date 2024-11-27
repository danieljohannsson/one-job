import { eq } from 'drizzle-orm';
import { db } from '../..';
import { rolesTable } from '../schema';

// Find or create a role
export const findOrCreateRole = async (roleName: string) => {
  let roleRecord = await db.select().from(rolesTable)
    .where(eq(rolesTable.roleName, roleName))
    .get();

  if (!roleRecord) {
    const insertedRole = await db.insert(rolesTable)
      .values({ roleName })
      .returning();
    roleRecord = insertedRole[0];
  }

  return roleRecord;
};