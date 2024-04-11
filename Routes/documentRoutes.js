const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadDocuments } = require('../Controller/documentControllers');
const { authenticateToken } = require('../Middleware/authMiddleware');
const uuid = require('uuid').v4;

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  }
});

const fileFilterConfig = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload = multer({
  storage: storageConfig,
  fileFilter: fileFilterConfig,
  limits: { fileSize: 10000000, files: 4 }
});

router.post('/uploadDocuments', authenticateToken, upload.fields([
  { name: 'aadharCardFront', maxCount: 1 }, 
  { name: 'aadharCardBack', maxCount: 1 },
  { name: 'medicalInsuranceCardFront', maxCount: 1 },
  { name: 'medicalInsuranceCardBack', maxCount: 1 } 
]), uploadDocuments);

module.exports = router;