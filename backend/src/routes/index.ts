import { Application } from "express"
import users from "./users";
import preferences from "./preferences";


export const addRoutes = (app: Application): void => {
    app.get(['/', '/healthcheck'], (req, res) => {
      res.status(200).send('Backend is running')
    })
  
    app.use('/users', users);
    // app.use('/jobs', jobs);
    app.use('/preferences', preferences);
    // app.use('/recommendations', recommendationRoutes);
  }