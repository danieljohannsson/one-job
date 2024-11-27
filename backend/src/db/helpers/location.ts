import { eq } from 'drizzle-orm';
import { locationsTable } from '../schema';
import { db } from '../..';

// Find or create a location
export const findOrCreateLocation = async (locationName: string) => {
  let locationRecord = await db.select().from(locationsTable)
    .where(eq(locationsTable.locationName, locationName))
    .get();

  if (!locationRecord) {
    const insertedLocation = await db.insert(locationsTable)
      .values({ locationName })
      .returning();
    locationRecord = insertedLocation[0];
  }

  return locationRecord;
};