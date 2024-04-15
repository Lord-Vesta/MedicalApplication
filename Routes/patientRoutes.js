// routes/patientRoutes.js
import express from 'express';
export const router = express.Router();
import { getPatientData, UpdatePatientPersonalData, CreatePatient } from'../Controller/patientControllers.js';
import { authenticateToken } from "../Middleware/authMiddleware.js";



router.get('/',authenticateToken, getPatientData);
router.post('/',authenticateToken, CreatePatient);
router.put('/:id',authenticateToken, UpdatePatientPersonalData);

