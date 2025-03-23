import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import entryRoutes from './routes/entry.routes.js';
import labRoutes from './routes/lab.routes.js';


//defining the port
const port = process.env.PORT || 6003;
const app = express();

//middleware to parse json data with a limit of 30mb
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

dotenv.config(); //loading environment variables from .env file

//defining a route for the root url
app.get('/', (req, res) => {
  res.send('Lab and Treatment Service API');
});

app.get('/api/v1/labtreatment', (req, res) => {
  res.send('Lab and Treatment Service API');
});

app.get('/api/v1/labtreatment/entrys', (req, res) => {
  res.send('Lab and Treatment Service API');
});

//mounting entry routes under the api path
app.use('/api/v1/labtreatment/entry', entryRoutes);
app.use('/api/v1/labtreatment/', labRoutes);

app.use;

//starting the server and listening on the defined port
app.listen(port, () => console.log(`Server running on port ${port}`));

export default app;
