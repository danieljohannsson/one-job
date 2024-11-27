import { db } from "../..";
import { userPreferencesTable } from "../schema";

// Insert user preference
export const insertUserPreference = async (
    userId: number, 
    roleId: number, 
    locationId: number, 
    companyId: number
  ) => {
    const userPreference = await db.insert(userPreferencesTable)
      .values({
        userId,
        roleId,
        locationId,
        companyId
      })
      .returning();
  
    return userPreference[0];
  };