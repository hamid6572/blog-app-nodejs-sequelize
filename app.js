const express = require('express');
const cors = require('cors');

const authRoute = require('./routes/authRoute');
const postsRoute = require('./routes/postsRoute');
const draftsRoute = require('./routes/draftsRoute');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = require('./models');
db.sequelize
  .sync({})
  .then(() => {
    console.log('resync table.');
  })
  .catch((err) => console.log(err));

app.use('/auth', authRoute);
app.use(postsRoute);
app.use(draftsRoute);

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const { message, data } = error;
  console.log(data);
  res.status(statusCode).json({
    message: message,
  });
});

app.listen(process.env.SERVER_PORT, () => {
  console.log('connected');
});
