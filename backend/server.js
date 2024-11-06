const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const app = express();
const AppDataSource = require('./config/database');


app.use(express.json());

// Sử dụng các routes
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

// AppDataSource.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack);
//   }
//   console.log('Connected to the database');
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});