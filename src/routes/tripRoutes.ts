// sukurti ir isexportuoti
import express from 'express';
import dbQueryWithData from '../helpers/helper';
import { TripObjType } from '../helpers/types';
const tripsRouter = express.Router();

const fields = 'id, name, date, country, city, rating, description, price, user_id';

// get all trips
tripsRouter.get('/', async (req, res) => {
  const sql = 'SELECT id, name, date, country, city, rating, description, price, user_id FROM trips WHERE is_deleted = 0';
  const [tripObj, error] = (await dbQueryWithData(sql)) as [TripObjType[], Error];
  if (error) {
    console.warn('error ===', error);
    res.status(400).json({ error: 'something went wrong' });
    return;
  }
  res.json(tripObj);
});

// get trips/:id
tripsRouter.get('/:tripId', async (req, res) => {
  const id = req.params.tripId;
  const sql = `SELECT ${fields} FROM trips WHERE is_deleted=0 AND id=?`;
  const [tripObj, error] = (await dbQueryWithData(sql, [id])) as [TripObjType[], Error];
  if (error) {
    console.warn('error ===', error);
    res.status(400).json({ error: 'something went wrong' });
    return;
  }
  if (tripObj.length === 0) {
    res.status(404).json({ msg: `Trip with id: ${id} was not found` });
    return;
  }
  res.json(tripObj);
});

export default tripsRouter;
