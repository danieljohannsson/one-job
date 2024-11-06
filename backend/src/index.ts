// index.ts
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import app from './app';

const client = createClient({
    url: process.env.DB_FILE_NAME!, // Path to SQLite database file
  });
 export const db = drizzle(client)
 app.listen(process.env.PORT, () => {
         console.log(`Server is running on http://localhost:${process.env.PORT}`);
       });

// You could also add additional initialization logic here if needed in the future,
// like connecting to a database, logging setup, etc.
