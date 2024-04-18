

import express from 'express';
import multer from 'multer';
// import {uploadDocuments,updateDocuments} from "../Controller/documentControllers.js"
// import {authenticateToken} from "../Middleware/authMiddleware.js"
import { v4 as uuid } from 'uuid';


export const router = express.Router();
import  { uploadDocuments, updateDocuments } from "../Controller/documentControllers.js";


import {authenticateToken} from "../Middleware/authMiddleware.js";

router.post('/uploadDocuments',authenticateToken, uploadDocuments);
// router.put('/updateDocuments/:userId', authenticateToken, updateDocuments);
router.put('/updateDocuments/:userId',authenticateToken, updateDocuments);


// module.exports = router;
