const express = require('express');
const dotenv=require('dotenv');
const cors = require('cors');
const initializeDbConnection = require('./config/database');

const propertyRouter=require('./routers/property');
const authRouter=require('./routers/auth');
const appointmentRouter=require('./routers/appointment');

const app = express();
app.use(express.json());
app.use(cors())

app.use('/property',propertyRouter);
app.use('/',authRouter);
app.use('/appointment',appointmentRouter);

dotenv.config({
    path: './config/.env'
});

const port =process.env.PORT;

app.listen(port, async() =>{
  console.log("connected on Port " + port);
  await initializeDbConnection();
});
