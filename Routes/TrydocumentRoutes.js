const express = require('express');
const router = express.Router();
const { validationResult } = require('express-validator');
const { multerErrorHandler, upload } = require('../helpers/validation');

const tryUploadDocs = (req, res) => {

    multerErrorHandler(req.multerError, req, res, () => {
       
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

     
        res.status(200).send({ success: true, data: req.body });
    });
};

router.post('/upload', upload, tryUploadDocs);

module.exports = router;
