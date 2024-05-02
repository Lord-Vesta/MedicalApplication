
import express from 'express';
export const router = express.Router();
import { uploadDocuments, updateDocuments } from "../Controller/documentControllers.js";
 
 
import {authenticateToken} from "../Middleware/authMiddleware.js"
 
router.post('/uploadDocuments',authenticateToken, uploadDocuments);
router.put('/updateDocuments/:id', authenticateToken, updateDocuments);
 
 
