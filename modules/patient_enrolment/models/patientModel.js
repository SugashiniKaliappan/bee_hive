
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const genders = ['Male', 'Female'];
const patient_type = ['Inpatient', 'Outpatient', 'Emergency'];
const status = ['Active', 'Inactive'];


const goodPhone = /^\+971\d{9}$/;
const goodEmail = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;


const PatientSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate: {
            validator: (value) => value.length > 0,
            message: "Cannot be empty, firstname is required"
        }
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        validate: {
            validator: (value) => value.length > 0,
            message: "Cannot be empty, lastname is required"
        }
    },
    birthDate: {
        type: Date,
        default: '1981-03-21',
        required: false
    },
    gender: {
        type: String,
        enum: genders,
        trim: true,
        required: true 
    },
    email: { 
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {  
            validator: (value) => {
                const lowercaseEmail = value.toLowerCase();
                return goodEmail.test(lowercaseEmail);
            },
            message: 'Invalid email format, Enter it in <name>@<domain>.<tld>'
        }
    },
    address: {
        type: String,
        required: false 
    },
    phone: {
        type: String,
        required: true,
        trim:true,      
        validate: {
            validator: (value) => goodPhone.test(value),
            message: 'Invalid Phone # format, Enter in +971XXXXX format'
        }
    },
    currentComplaints : {
        type: [String],
        
        required: true
    },
    knownDiseases: {
        type: [String],
        
        required: true
    },
    type: {
        type: String,
        enum: patient_type,
        required: false,
       
        default: 'Outpatient' 
    },
    status: {
        type: String,
        enum: status,
        required: false,
        default: 'Active'
    },
    entryPoint: {
        type: String,
        enum: ['OPD', 'A&E'],
       
        required: true
    },
    currentLocation: { 
        type: String,
        enum: ['OPD', 'A&E', 'Medicine', 'Surgery', 'Orthopedics', 'Pediatrics', 'ENT', 'Ophthalmology', 'Gynecology', 'Dermatology', 'Oncology', 'None'],
        required: false,
        default: function() {
            return this.entryPoint;
        }
    },
    department: {
        type: String,
        required: true,
        
        enum: ['A&E','OPD','Medicine', 'Surgery', 'Orthopedics', 'Pediatrics', 'ENT', 'Ophthalmology', 'Gynecology', 'Dermatology', 'Oncology', 'None']
    },
    services: [{
        type: String,
        
        enum: ['Radiology', 'Pathology', 'Physiotherapy', 'Blood Bank', 'Operation Theatres', 'ICU', 'CCU', 'None']
    }],
});


const PatientModel = mongoose.model('Patients', PatientSchema);
module.exports = PatientModel;