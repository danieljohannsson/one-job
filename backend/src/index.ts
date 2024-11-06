import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import app from './app';

const PORT = process.env.PORT || 5000;

const client = createClient({
    url: process.env.DB_FILE_NAME!,
});

export const db = drizzle(client)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});