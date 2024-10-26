import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Open the database connection
export const db = open({
    filename: './users.db',
    driver: sqlite3.Database
  });

// Initialize the database and create a table for storing emails and roles
export const initDb = async () => {
  const database = await db;
  
  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      location TEXT,
      company TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log("Database initialized and users table created.");
};

// Function to store email and role
export const storeUser = async (email: string, role: string, location: string, company: string) => {
    try {
      const database = await db;
      await database.run(
        'INSERT INTO users (email, role, location, company) VALUES (?, ?, ?, ?)',
        [email, role, location, company]
      );
      console.log(`Stored email: ${email}, role: ${role}, location: ${location} and company: ${company}`);
    } catch (error) {
      console.error('Error storing user preferences:', error);
    }
  };

  export const fetchUsers = async () => {
    try {
      const database = await db;
      const rows = await database.all('SELECT email, role, location, company FROM users');
      return rows;
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      throw error;
    }
  };