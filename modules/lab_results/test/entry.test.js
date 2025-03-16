import { expect } from "chai";
import { should, use } from "chai";
import supertest from "supertest";
import server from "../index.js";
import mongoose from "mongoose";

const db = process.env.DATABASE_URL_DEV;

//connecting to mongodb database
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjA0ZDU2MjkyLWMxYzItNDg2Yy1hYmZkLTc1MzE0NDBlZGIzZiIsInJvbGUiOiJOdXJzZSIsImlhdCI6MTc0MDIyNDU4NywiZXhwIjoxNzQyODE2NTg3fQ.u_bUSTij3vqTYHOBjCRbf74F8DhN0Z4Wxqo8b1AEstE";
//defining the schema for lab results
const labResultSchema = new Schema({
  labResultId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toHexString(),
    alias: "_id",
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patients",
    required: true,
  },
  diagnosticMachine: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//defining the schema for patient treatment
const patientTreatmentSchema = new Schema({
  diagnosisId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toHexString(),
    alias: "_id",
    required: true,
  },
  patientId: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  diagnosis: {
    type: String,
    required: false,
  },
  treatment: {
    type: String,
    required: false,
  },
  medicine: {
    type: String,
    required: false,
  },
  signedOff: {
    type: Boolean,
    required: false,
    default: false,
  },
});

//defining the schema for daily treatment
const dailyTreatmentSchema = new Schema({
  dailyTreatmentId: {
    type: String,
    default: () => new mongoose.Types.ObjectId().toHexString(),
    alias: "_id",
    required: true,
  },
  diagnosisId: {
    ref: "PatientTreatment",
    type: Schema.Types.ObjectId,
    required: true,
  },
  intake: {
    type: String,
    required: false,
  },
  output: {
    type: String,
    required: false,
  },
  progress: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

//creating mongoose models for testing
const Lab = mongoose.model("LabResultTest", labResultSchema);
const Treatment = mongoose.model(
  "PatientTreatmentTest",
  patientTreatmentSchema
);
const DailyTreatment = mongoose.model(
  "DailyTreatmentTest",
  dailyTreatmentSchema
);

describe("DB Connection", () => {
  it("it should return a connection", (done) => {
    mongoose
      .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        done();
      });
  });
});

//test to clear the patient treatment collection
describe("PatientTreatment", () => {
  it("it should clear the collection", async () => {
    const result = await Treatment.deleteMany({});
    expect(result).to.be.an("object");
  });
});

//test to create a new treatment
describe("Treatment", () => {
  let diagnosisId;

  describe("POST /api/v1/labtreatment/entry/treatment", () => {
    it("it should create a new treatment", (done) => {
      const treatment = {
        patientId: "60b9d1f8e4b4b9d2e4c6d9c8",
        diagnosis: "Malaria",
        treatment: "IV",
        medicine: "Paracetamol",
      };

      supertest(server)
        .post("/api/v1/labtreatment/entry/treatment")
        .set("Authorization", `Bearer ${token}`)
        .send(treatment)
        .end((err, res) => {
          diagnosisId = res.body.diagnosisId;
          console.log(res.body);
          expect(res.status).to.equal(201);
          done();
        });
    });
  });

 //test to get treatment by id
  describe("GET /api/v1/labtreatment/entry/treatment/:id", () => {
    it("it should return all treatments", (done) => {
      supertest(server)
        .get(`/api/v1/labtreatment/entry/treatment/${diagnosisId}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

 //test to update a treatment by id  
  describe("PATCH /api/v1/labtreatment/entry/treatment/:id", () => {
    it("it should update a treatment", (done) => {
      const treatment = {
        treatment: "IV",
        medicine: "Paracetamol",
      };

      supertest(server)
        .patch(`/api/v1/labtreatment/entry/treatment/${diagnosisId}`)
        .set("Authorization", `Bearer ${token}`)
        .send(treatment)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });

  

  describe("GET /api/v1/labtreatment/entry/diagnosis/:id", () => {
    it("it should return all diagnosis", (done) => {
      supertest(server)
        .get(`/api/v1/labtreatment/entry/diagnosis/${diagnosisId}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});

// ✅ Close database connection after tests complete
after(async function () {
  await mongoose.connection.close();
  console.log("✅ Database Connection Closed");
});
