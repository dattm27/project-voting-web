import express, { Request, Response, NextFunction } from 'express';
import { config as configDotenv } from 'dotenv';
import cors from 'cors';
import electionRoutes from './routes/ElectionRoutes';
import candidateRoutes from './routes/CandidateRoutes';
import AppDataSource from './config/database';
import cookieParser from 'cookie-parser';

configDotenv();

const app = express();

app.use(cors(
  {
    origin: 'https://vercel-deploy-chi-henna.vercel.app',
    credentials: true,
  }
));
app.use(express.json());

app.use(cookieParser());

// Sử dụng các routes
app.use('/api', electionRoutes, candidateRoutes);

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