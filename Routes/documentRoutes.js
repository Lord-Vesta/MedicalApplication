// routes.js

const express = require('express');
const router = express.Router();
const { uploadDocuments, updateDocuments } = require("../Controller/documentControllers");


const {authenticateToken}=require("../Middleware/authMiddleware")

router.post('/uploadDocuments',authenticateToken, uploadDocuments);
router.put('/updateDocuments/:id', authenticateToken, updateDocuments);



module.exports = router;
