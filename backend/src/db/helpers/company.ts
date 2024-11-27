import { eq } from 'drizzle-orm';
import { db } from '../..';
import { companiesTable } from '../schema';

// Find or create a company
export const findOrCreateCompany = async (companyName: string) => {
  let companyRecord = await db.select().from(companiesTable)
    .where(eq(companiesTable.companyName, companyName))
    .get();

  if (!companyRecord) {
    const insertedCompany = await db.insert(companiesTable)
      .values({ companyName })
      .returning();
    companyRecord = insertedCompany[0];
  }

  return companyRecord;
};