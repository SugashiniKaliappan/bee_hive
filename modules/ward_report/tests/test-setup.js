const mongoose = require('mongoose');

//function_to_connect_testdb
const connectToTestDatabase = async () => {

  await mongoose.connect(testDatabaseURL, {

    useNewUrlParser: true,

    useUnifiedTopology: true,

  });

};


//function_to_close_connection_testdb
const closeTestDatabaseConnection = async () => {

  await mongoose.connection.dropDatabase();

  await mongoose.connection.close();

};
 

beforeAll(async () => {

  await connectToTestDatabase();

});
 

afterAll(async () => {

  await closeTestDatabaseConnection();

});
 

beforeEach(async () => {

});
 

afterEach(async () => {

});
 
module.exports = {

  connectToTestDatabase,

  closeTestDatabaseConnection,

};