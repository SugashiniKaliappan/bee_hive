const mongoose = require('mongoose');
 
const connectToTestDatabase = async () => {

  await mongoose.connect(testDatabaseURL, {

    useNewUrlParser: true,

    useUnifiedTopology: true,

  });

};
 
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
