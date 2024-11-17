import express, { Request, Response, NextFunction } from 'express';
import { config as configDotenv } from 'dotenv';
import photoRoutes from './routes/PhotoRoutes';
import electionRoutes from './routes/ElectionRoutes';
import candidateRoutes from './routes/CandidateRoutes';
import AppDataSource from './config/database'

configDotenv();

const app = express();

app.use(express.json());

// Sử dụng các routes
app.use('/api', photoRoutes, electionRoutes, candidateRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err: Error) => {
    console.error('Error connecting to the database', err);
  });