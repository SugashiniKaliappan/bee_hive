import request from "supertest";
import { app } from "../src/index.js";

describe("Ward Controller - Integration Tests", () => {
  const sampleWard = {
    wardNumber: 156,
    wardName: "Sample Ward",
    totalBeds: 10,
    availableBeds: 5,
  };

  describe("POST /api/v1/wardadmissions", () => {
    it("should create a new ward successfully", async () => {
      const response = await request(app)
        .post("/api/v1/wardadmissions")
        .send(sampleWard);

      console.log("🔴 Debugging Response:", response.body); // ✅ Log response to check errors

      expect(response.status).toBe(201);
      expect(response.body).toMatchObject({
        wardNumber: expect.any(Number),
        wardName: expect.any(String),
        totalBeds: expect.any(Number),
        availableBeds: expect.any(Number),
      });
    }, 25000);
  });
});
