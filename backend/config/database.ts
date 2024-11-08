import { DataSource } from 'typeorm';
import { config as configDotenv } from 'dotenv';
import Photo from '../models/Photo';

configDotenv();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Photo],
});

export default AppDataSource;