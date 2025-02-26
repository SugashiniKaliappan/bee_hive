
require('dotenv').config();
const connect = require('./helpers/db');
connect();

const express = require('express');
const app = express();

app.use(express.json());


const morgan = require('morgan');
app.use(morgan('dev'));


const checkAuth = require('./middleware/authRole');
app.use('/api/v1/patient', checkAuth);

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/v1/patient', patientRoutes);


app.listen(3002, () => console.log('Patient enrollment microservice -Port  3002'));

