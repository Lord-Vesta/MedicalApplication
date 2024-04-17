// import express from 'express';
// import multer from 'multer';
// import {uploadDocuments,updateDocuments} from "../Controller/documentControllers.js"
// import {authenticateToken} from "../Middleware/authMiddleware.js"
// import { v4 as uuid } from 'uuid';


// export const router = express.Router();



// export const storageConfig = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid()}-${originalname}`);
//   }
// });

// export const fileFilterConfig = (req, file, cb) => {
//   if (file.mimetype.split("/")[0] === "image") {
//     cb(null, true);
//   } else {
//     cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
//   }
// };

// export const upload = multer({
//   storage: storageConfig,
//   fileFilter: fileFilterConfig,
//   limits: { fileSize: 10000000, files: 4 }
// });

// router.post('/uploadDocuments', authenticateToken, upload.fields([
//   { name: 'aadharCardFront', maxCount: 1 }, 
//   { name: 'aadharCardBack', maxCount: 1 },
//   { name: 'medicalInsuranceCardFront', maxCount: 1 },
//   { name: 'medicalInsuranceCardBack', maxCount: 1 } 
// ]), uploadDocuments);


// router.put('/updateDocuments/:id', authenticateToken, upload.fields([
//     { name: 'aadharCardFront', maxCount: 1 }, 
//     { name: 'aadharCardBack', maxCount: 1 },
//     { name: 'medicalInsuranceCardFront', maxCount: 1 },
//     { name: 'medicalInsuranceCardBack', maxCount: 1 } 
//   ]),updateDocuments);

// router.put('/updateDocuments/:id', authenticateToken, upload.fields([
//     { name: 'aadharCardFront', maxCount: 1 }, 
//     { name: 'aadharCardBack', maxCount: 1 },
//     { name: 'medicalInsuranceCardFront', maxCount: 1 },
//     { name: 'medicalInsuranceCardBack', maxCount: 1 } 
//   ]), updateDocuments);




import express from 'express';
export const router = express.Router();
import { uploadDocuments, updateDocuments } from "../Controller/documentControllers.js";
 
 
import {authenticateToken} from "../Middleware/authMiddleware.js"
 
router.post('/uploadDocuments',authenticateToken, uploadDocuments);
router.put('/updateDocuments/:id', authenticateToken, updateDocuments);
 
 
