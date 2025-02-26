const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const checkRole = require('../middleware/checkRole');


router.post('/register', checkRole(['Clerk']), patientController.register); 

router.get('/:id', checkRole(['Doctor', 'Paramedic', 'Nurse']), patientController.details);    
router.put('/:id', checkRole(['Doctor', 'Paramedic', 'Nurse']), patientController.updatePatient); 

module.exports = router;