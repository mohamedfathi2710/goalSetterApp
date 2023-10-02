const express = require('express');
const dotenv = require('dotenv').config();
const goalRoutes = require('./routes/goalRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/goals', goalRoutes);

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`The App is running in PORT ${PORT}`)
})
