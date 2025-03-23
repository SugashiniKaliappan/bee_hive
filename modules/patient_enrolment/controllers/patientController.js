const PatientModel = require('../models/patientModel');
exports.register = async (req, res) => {
    try {
        const existingPatient = await PatientModel.findOne({ email: req.body.email });// NOSONAR
        if (existingPatient) {
            return res.status(409).send({ message: 'This Patient already exists', success: false});
        }
        const newPatient = new PatientModel(req.body);
        await newPatient.save();// NOSONAR
        res.status(201).send({ message: 'Resgitered patient  successfully', success: true });

        
    } catch (error) { 
        console.error(error);
        
        res.status(500).send({ message: `Error occurred during registering the patient ${error.message}`, success: false});
    }
};
async function findPatientById(id) {
    const patient = await PatientModel.findById(id);// NOSONAR
    if (!patient) {
        return res.status(404).send({ message: 'Patient enrolment not found', success: false });
    }
    return patient;
};



exports.details = async (req, res) => {
    try {
        console.log(req.params)
        const patient = await findPatientById(req.params.id);// NOSONAR
        console.log(patient);
        res.status(200).send(patient);
    } catch (error) {
        res.status(500).send({ message: `Error occurred while fetching the patient details ${error.message}`, success: false});
    }
};


exports.updatePatient = async (req, res) => {
    try {
        let patient = await findPatientById(req.params.id);// NOSONAR
        patient.type = req.body.type;
        patient.department = req.body.department;

        
        if (req.body.knownDiseases) {
            patient.knownDiseases = [...new Set(patient.knownDiseases.concat(req.body.knownDiseases))];
        }
        if (req.body.currentComplaints) {
            patient.currentComplaints = [...new Set(patient.currentComplaints.concat(req.body.currentComplaints))];
        }
        if (req.body.services) {
            patient.services = [...new Set(patient.services.concat(req.body.services))];
        }
        
        const updatedPatient = await patient.save();// NOSONAR
        console.log(updatedPatient);
        res.status(200).send(updatedPatient); 

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: `Error occurred while updating the patient details ${error.message}`, success: false});
    }
};
