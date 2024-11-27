import { db } from "..";
import { companiesTable, jobRecommendationsTable, jobsTable, userPreferencesTable, usersTable } from "./schema";
import { eq } from "drizzle-orm";


export const getUsers = async () => {
    try {
      const database = await db;
      const users = await database.select().from(usersTable)
      console.log('Getting all users from the database: ', users)
      return users;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  };

  export const getJobsPrefferedByUser = async (userId: number) => {
    // Fetch jobs for the user
    const jobRecommendations = await db
    .select()
    .from(jobRecommendationsTable)
    .where(eq(jobRecommendationsTable.userId, userId));
    
    const jobs = [];

    for (const jobRecommendation of jobRecommendations) {
        const jobDetails = await db
        .select()
        .from(jobsTable)
        .where(eq(jobsTable.jobId, jobRecommendation.jobId)).limit(1);
        jobs.push(...jobDetails);
    }
    return jobs;
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

export const createUserPreference = async (userId: number, roleId: number, locationId: number, companyId: number) => {
    try {
    const database = await db;
    const userPreference: typeof userPreferencesTable.$inferInsert = {
        userId: userId,
        roleId: roleId,
        locationId: locationId,
        companyId: companyId
      };
      const result = await database.insert(userPreferencesTable).values(userPreference).returning({ id: userPreferencesTable.preferenceId });
      const preferenceId = result[0].id; // Adjust this based on how your DB driver returns the ID
      console.log('Job preference added with ID:', preferenceId);
      return preferenceId;
    } catch (error) {
    console.error('Error storing job preference:', error);
    }
}

export const createCompany = async (companyName: string, userId: number) => {
    try {
    const database = await db;
    const company: typeof companiesTable.$inferInsert = {
        companyName: companyName,
      };
      const companyResult = await database.insert(companiesTable).values(company).returning({ id: companiesTable.companyId });
      const companyId = companyResult[0].id;
      console.log('User added with ID:', userId);
      console.log('Company added with ID:', companyId);
        return companyId;
    } catch (error) {
    console.error('Error creating company:', error);
    }
}

export const createUser = async (email: string) => {
try {
    const database = await db;
    
    const user: typeof usersTable.$inferInsert = {
    email: email
    };

    let userIdResult;
    if (!(await userExists(email))) {
    userIdResult = await database.insert(usersTable).values(user).returning({ id: usersTable.userId });
    } else {
    userIdResult = await database.select({ id: usersTable.userId }).from(usersTable).where(eq(usersTable.email, email)).limit(1);
    }
    const userId = userIdResult[0].id;
    console.log('User added with ID:', userId);
    return userId;
} catch (error) {
    console.error('Error creating user:', error);
}
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