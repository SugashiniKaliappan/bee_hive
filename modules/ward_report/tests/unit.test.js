require('dotenv').config(); // ✅ Load environment variables from .env
const mongoose = require('mongoose');
const { expect } = require('chai');
const sinon = require('sinon');
const Ward = require('../src/models/ward.model');
const wardController = require('../src/controller/ward.controller');


before(async function () {
  this.timeout(10000);

  console.log("DEBUG: DATABASE_URL_DEV =", process.env.DATABASE_URL_DEV);

  if (!process.env.DATABASE_URL_DEV) {
    throw new Error("❌ ERROR: DATABASE_URL_DEV is not set! Check your .env file.");
  }

  await mongoose.connect(process.env.DATABASE_URL_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // ✅ Delete existing ward records before tests
  console.log("DEBUG: Clearing existing wards before running tests...");
  await Ward.deleteMany({});
});


// ✅ Ensure MongoDB Connection
describe('Ward Controller - Unit Tests', function () {
  this.timeout(20000); // ✅ Mocha timeout to prevent premature failures

  let req, res, sandbox;

  before(async function () {
    this.timeout(10000); // ✅ Increase timeout for database connection

    console.log("DEBUG: DATABASE_URL_DEV =", process.env.DATABASE_URL_DEV); // ✅ Debugging output

    if (!process.env.DATABASE_URL_DEV) {
      throw new Error("❌ ERROR: DATABASE_URL_DEV is not set! Check your .env file.");
    }

    await mongoose.connect(process.env.DATABASE_URL_DEV, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox(); // ✅ Creates a sandbox for mocks
    req = { body: {} };
    res = {
      status: sandbox.stub().returnsThis(),
      send: sandbox.stub(),
    };
  });

  afterEach(() => {
    sandbox.restore(); // ✅ Restores original functions after each test
  });

  after(async function () {
    // ✅ Close MongoDB connection after all tests
    await mongoose.connection.close();
  });

  const sampleWard = {
    wardNumber: 1,
    wardName: 'Sample Ward',
    totalBeds: 10,
    availableBeds: 5,
    doctors: [],
    patients: [],
  };

  describe('create', () => {
    it('should create a new ward successfully', async function () {
      this.timeout(10000); // ✅ Allow async test execution
    
      req.body = sampleWard;
    
      return wardController.create(req, res).then(() => {
        console.log("DEBUG: res.status called with:", res.status.args); // ✅ Log status calls
        console.log("DEBUG: res.send called with:", res.send.args); // ✅ Log response body
    
        // 🔹 Fix assertion: Ensure the response status is 201
        expect(res.status.calledWith(201)).to.be.true;
    
        // 🔹 Fix assertion: Ensure response contains the ward object
        expect(res.send.calledWith(sinon.match.has("wardNumber"))).to.be.true;
      });
    });
    

    it('should handle errors during ward creation', async function () {
      this.timeout(10000);

      const error = { name: 'ValidationError', message: 'Validation error' };
      sandbox.stub(mongoose.Model.prototype, 'save').rejects(error);

      req.body = sampleWard;

      return wardController.create(req, res).then(() => {
        expect(res.status.calledWith(400)).to.be.true;
        expect(res.send.calledWith(error)).to.be.true;
      });
    });
  });
});
