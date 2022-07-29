const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoute = require('./src/routes/users');
const authRoute = require('./src/routes/auth');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to database 😎✌️'))
  .catch((err) => console.log(err));

// Middlewares
app.use(express.json());
app.use('/api/v1/users', userRoute);
app.use('/api/v1/auth', authRoute);

// listen when mongoose has conneced
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
