import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
// import mysql from 'mysql2';
import tripsRouter from './routes/tripRoutes.js';
import { PORT, dbConfig } from './config.js';
import testConnection from './helpers/testRoutes.js';

const app = express();

const port = PORT || 5000;
console.log(' dbConfig ===', dbConfig);

testConnection();

// Middlewere
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.json({ msg: 'server is runing' });
});

// Routes
app.use('/trips', tripsRouter);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Path not found', path: req.url });
});

app.listen(port, () => {
  console.log(`Server is runing on http://localhost: ${port}`);
});
