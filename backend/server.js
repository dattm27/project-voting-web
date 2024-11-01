const express = require('express');
const userRoutes = require('./routes/userRoutes');
const pool = require('./config/database');
require('dotenv').config();
const app = express();

app.use(express.json());

// Sử dụng các routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;


pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('Connected to the database');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});