const express = require('express');
const dotenv = require('dotenv').config();
const tripRoutes = require('./routes/tripRoutes');
const userRoutes = require('./routes/userRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const app = express();

const PORT = process.env.PORT || 5000;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/trips', tripRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`The App is running in PORT ${PORT}`)
})
