

import express from 'express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';


export const router = express.Router();
import  { uploadDocuments, updateDocument } from "../Controller/documentControllers.js";


import {authenticateToken} from "../Middleware/authMiddleware.js";

router.post('/uploadDocuments',authenticateToken, uploadDocuments);

router.put('/updateDocuments/:userId',authenticateToken, updateDocument);


