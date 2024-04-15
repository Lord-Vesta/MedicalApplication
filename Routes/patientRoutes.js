// routes/patientRoutes.js
// const express = require('express');
// const router = express.Router();
// const { getPatientPersonalData, updatePatientPersonalData, createPatient } = require('../Controller/patientControllers');

import express from "express"
import { getPatientPersonalData, updatePatientPersonalData, createPatient } from "../Controller/patientControllers.js"

export const router = express.Router();




router.get('/', getPatientPersonalData);
router.post('/', createPatient);
router.put('/:id', updatePatientPersonalData);

// module.exports = router;
