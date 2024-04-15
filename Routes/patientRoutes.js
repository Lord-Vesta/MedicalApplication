// routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const { getPatientData, UpdatePatientPersonalData, CreatePatient } = require('../Controller/patientControllers');
const { authenticateToken } = require("../Middleware/authMiddleware.js");



router.get('/',authenticateToken, getPatientData);
router.post('/',authenticateToken, CreatePatient);
router.put('/:id',authenticateToken, UpdatePatientPersonalData);

module.exports = router;
