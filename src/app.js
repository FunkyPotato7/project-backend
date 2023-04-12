const express = require('express');
const mongoose = require('mongoose');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');
require('dotenv').config();

const config = require('./config/config');
const { authRouter, paidRouter, userRouter, adminRouter, groupRouter } = require('./router');
const swaggerJson = require('../swagger.json');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/auth', authRouter);
app.use('/paid', paidRouter);
app.use('/groups', groupRouter);
app.use('/users', userRouter);
app.use('/admin', adminRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJson));

//Global error handler
app.use((err, req, res, next) => {
   res.status(err.status || 500).json(err.message);
});

const connection = async () => {
   mongoose.set("strictQuery", false);
   let dbConnected = false;
   console.log('Connecting to database...');

   while (!dbConnected) {
      try {
         await mongoose.connect(config.DB_URL);
         dbConnected = true;
         console.log('Database available');
      } catch (e) {
         console.log('Database unavailable, wait 3 seconds');
         await new Promise(resolve => setTimeout(resolve, 3000));
      }
   }
};

const start = async () => {
   try {
      await connection();
      app.listen(config.PORT, config.HOST);
      console.log(`Server listen ${config.PORT}`);
   } catch (e) {
      console.log(e);
   }
};

start();
