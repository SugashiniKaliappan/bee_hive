const mongoose = require('mongoose');

//function_to_connect_testdb
const connectToTestDatabase = async () => {

  await mongoose.connect(testDatabaseURL, {// NOSONAR

    useNewUrlParser: true,

    useUnifiedTopology: true,

  });

};


//function_to_close_connection_testdb
const closeTestDatabaseConnection = async () => {

  await mongoose.connection.dropDatabase();// NOSONAR

  await mongoose.connection.close();// NOSONAR

};
 

beforeAll(async () => {

  await connectToTestDatabase();// NOSONAR

});
 

afterAll(async () => {

  await closeTestDatabaseConnection();// NOSONAR

});
 

beforeEach(async () => {

});
 

afterEach(async () => {

});
 
module.exports = {

  connectToTestDatabase,

  closeTestDatabaseConnection,

};