import { eq } from 'drizzle-orm';
import { db } from '../..';
import { companiesTable } from '../schema';

// Find or create a company
export const findOrCreateCompany = async (companyName: string) => {
  let companyRecord = await db
    .select()
    .from(companiesTable)
    .where(eq(companiesTable.companyName, companyName))
    .get();

  if (!companyRecord) {
    const insertedCompany = await db
      .insert(companiesTable)
      .values({ companyName })
      .returning();
    companyRecord = insertedCompany[0];
  }

  return companyRecord;
};

export const getCompanies = async () => {
  try {
    const database = await db;

    const companies = await database.select().from(companiesTable);

    console.log('Getting all companies from the database: ', companies);

    return companies;
  } catch (error) {
    console.error('Error fetching companies:', error);
    throw error;
  }
};
