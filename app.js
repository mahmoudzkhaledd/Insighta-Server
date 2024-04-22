const express = require('express');
const app = express();
require('dotenv').config();
const appRouter = require('./Features/FeaturesRouter')
const errorHandeler = require('./Error_Handeler/ErrorsHandelerModule');
const PORT = process.env.PORT;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const configDbConnection = require('./Configs/DB_Config');
const { trimRequest } = require('./Utils/TrimRequest');

app.use(cors({ origin: true, credentials: true, }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 350,
  message: "Too many requests, please try again after 15 mins",
});
configDbConnection();
app.use(limiter);

app.use(express.json({ limit: '300kb' }));
app.use(cookieParser());
app.use(trimRequest());
app.use(hpp());
app.use(appRouter);

app.all('*', (req, res, next) => {
  return res.status(404).json({
    "msg": "Can't find this route !",
  });
});
const server = app.listen(PORT, () => {
  console.log(`listen to http://localhost:${PORT}/`)
});

app.use(errorHandeler);
process.on('unhandledRejection', (error) => {
  console.log(`Unhandeled Exeption ${error}`);
});
