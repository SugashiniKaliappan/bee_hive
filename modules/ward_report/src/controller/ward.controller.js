const mongoose = require("mongoose");
const Ward = require("../models/ward.model");


//ward_controller
const wardController = {
  create: async (req, res) => {
    const ward = new Ward(req.body);
    try {
      await ward.save();// NOSONAR
      res.status(201).send(ward);
    } catch (error) {
      res.status(400).send(error);
    }
  },
//returning_all_wards
  getAll: async (req, res) => {
    try {
      const wards = await Ward.find({});// NOSONAR
      res.send(wards);
    } catch (error) {
      res.status(500).send(error);
    }
  },
//returning_wards_by_id
  getById: async (req, res) => {
    try {
      const ward = await Ward.findById(req.params.id);// NOSONAR
      if (!ward) {
        return res.status(404).send();
      }
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },
//update_ward_using_id
  update: async (req, res) => {
    try {
      const ward = await Ward.findByIdAndUpdate(req.params.id, req.body, {// NOSONAR
        new: true,
        runValidators: true,
      });
      if (!ward) {
        return res.status(404).send();
      }
      res.send(ward);
    } catch (error) {
      res.status(400).send(error);
    }
  },
//delete_ward_id
  delete: async (req, res) => {
    try {
      const ward = await Ward.findByIdAndDelete(req.params.id);// NOSONAR
      if (!ward) {
        return res.status(404).send();
      }
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },
//assigning_doctor_to_ward
  assignDoctor: async (req, res) => {
    try {
      const ward = await Ward.findById(req.params.wardId);// NOSONAR
      const doctor = await Doctor.findById(req.params.doctorId);// NOSONAR
      if (!ward || !doctor) {
        return res.status(404).send();
      }
      ward.doctors.push(doctor);
      await ward.save();// NOSONAR
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },
//adding_patient_to_ward
  addPatient: async (req, res) => {
    try {
      const ward = await Ward.findById(req.params.wardId);// NOSONAR
      const doctor = await Doctor.findById(req.params.doctorId);// NOSONAR
      const patient = await Patient.findById(req.params.patientId);// NOSONAR
      if (!ward || !doctor || !patient) {
        return res.status(404).send();
      }
      ward.patients.push({ patient: patient._id, doctor: doctor._id });
      await ward.save();// NOSONAR
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },
//discharge_patient_from_ward
  dischargePatient: async (req, res) => {
    try {
      const ward = await Ward.findById(req.params.wardId);// NOSONAR
      if (!ward) {
        return res.status(404).send();
      }
      ward.patients.id(req.params.patientId).remove();
      await ward.save();// NOSONAR
      res.send(ward);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = wardController;