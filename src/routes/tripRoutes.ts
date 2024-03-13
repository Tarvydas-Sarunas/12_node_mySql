// sukurti ir isexportuoti
import express from 'express';

const tripsRouter = express.Router();

// get
tripsRouter.get('/', async (req, res) => {
  res.json('getting all trips');
});

export default tripsRouter;
