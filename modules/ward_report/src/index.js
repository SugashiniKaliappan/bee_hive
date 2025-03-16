const express = require('express');
const connectToDbFunc = require('./config/dbConnect');
const router = require('./routes/ward.route');
require('dotenv').config();
const app = express();

module.exports = app;
app.use(express.json());

const PORT = process.env.PORT || 5001;

setTimeout(() => { // delaying_database_connection
    connectToDbFunc();
}, 2000);

// settingup_route_for_ward_admissions
app.use('/api/v1/wardadmissions',router)

// starting_the_server
app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
})