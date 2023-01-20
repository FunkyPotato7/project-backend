const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();

const config = require('./config/config');
const { authRouter, paidRouter } = require('./router');
const swaggerJson = require('../swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/auth', authRouter);
app.use('/paid', paidRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

//Global error handler
app.use((err, req, res, next) => {
   res.status(err.status || 500).json(err.message);
});

app.listen(config.PORT, () => {
   mongoose.set("strictQuery", false);
   mongoose.connect(config.DB_URL);
   console.log(`Server listen ${config.PORT}`);
});
