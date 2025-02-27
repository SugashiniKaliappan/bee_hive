const mongoose = require('mongoose');

//use non-synchronous connection to the database for non-blocking IO
const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log(`Mongo DB connected to ${mongoose.connection.host}:${mongoose.connection.port}`);
    } catch (error) {
    console.error(`MongoDB  connection error: ${error.message}`);
    process.exit(1);
    }
}
module.exports = connect;