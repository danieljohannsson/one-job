import { Request, Response } from 'express';
import { getUsers } from '../db/util';

  export const users = async (req: Request, res: Response) => {
    console.log('/users was called')
    try {
      const users = await getUsers();
      res.status(200).json( users );
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving data' });
    }
}