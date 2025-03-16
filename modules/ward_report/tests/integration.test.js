const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index.js'); 

// integration_tests_for_ward_controller
describe('Ward Controller - Integration Tests', () => {
  
  const sampleWard = {
    wardNumber: 1,
    wardName: 'Sample Ward',
    totalBeds: 10,
    availableBeds: 5,
    doctors: [],
    patients: [],
  };
 // testing_post_request_to_create_new_ward_using_sampleWard
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