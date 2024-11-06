const { DataSource } = require('typeorm');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    'backend/models/*.js'
  ]
});

AppDataSource.initialize()
  .then(() => console.log('Connected to the database'))
  .catch((err) => console.error('Error connecting to the database', err));

module.exports = AppDataSource;