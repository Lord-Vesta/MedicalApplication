
const express = require('express');
const router = express.Router();
const { uploadAadharFront, uploadAadharBack, uploadMedicalInsuranceFront, uploadMedicalInsuranceBack } = require('../Controller/documentControllers');


router.post('/aadhar-card/front', uploadAadharFront);

router.post('/aadhar-card/back', uploadAadharBack);


router.post('/medical-insurance-card/front', uploadMedicalInsuranceFront);


router.post('/medical-insurance-card/back', uploadMedicalInsuranceBack);

module.exports = router;
