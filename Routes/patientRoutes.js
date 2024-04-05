// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const { getPatientPersonalData, updatePatientPersonalData, createPatient } = require('../Controllers/patientControllers');




router.get('/', getPatientPersonalData);
router.post('/', createPatient);
router.put('/:id', updatePatientPersonalData);

module.exports = router;
