const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app'); 
describe('Ward Controller - Integration Tests', () => {
  
  const sampleWard = {
    wardNumber: 1,
    wardName: 'Sample Ward',
    totalBeds: 10,
    availableBeds: 5,
    doctors: [],
    patients: [],
  };
 
  describe('POST /wards', () => {
    it('should create a new ward successfully', async () => {
      const response = await request(app)
        .post('/wards')
        .send(sampleWard);
 
      expect(response.status).toBe(201);
      expect(response.body).toEqual(expect.objectContaining(sampleWard));
    });
  });
 
});