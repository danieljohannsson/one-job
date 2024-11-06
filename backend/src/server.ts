// // server.ts
// import app from './app';
// import { initDb } from './db/database';

// // Start the server
// const PORT = process.env.PORT || 5000;

// // Initialize the database and then start the server
// initDb().then(() => {
//   app.listen(process.env.PORT, () => {
//     console.log(`Server is running on http://localhost:${process.env.PORT}`);
//   });
// }).catch((err) => {
//   console.error('Failed to initialize the database', err);
// });