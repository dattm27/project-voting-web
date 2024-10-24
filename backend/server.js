const express = require('express');
//const userRoutes = require('./routes/userRoutes');
require('dotenv').config();
const app = express();

app.use(express.json());

// Sử dụng các routes
//app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
