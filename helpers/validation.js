const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/Documents')); 
    },
    filename: function (req, file, cb) {
        const uniqueFilename = uuidv4() + path.extname(file.originalname);
        cb(null, uniqueFilename);
    }
});


const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image') || file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
    }
};

const multerErrorHandler = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            const fieldName = err.fieldname;
            return res.status(400).json({ error: `File size too large for ${fieldName}. Maximum size allowed is 10MB.` });
        } else if (err.code === 'LIMIT_FILE_COUNT') {
            const fieldName = err.fieldname;
            return res.status(400).json({ error: `Exceeded maximum number of files allowed for ${fieldName}.` });
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            const fieldName = err.fieldname;
            return res.status(400).json({ error: `Uploaded unexpected file type for ${fieldName}.` });
        } else {
            return res.status(400).json({ error: err.message });
        }
    } else {
        return res.status(500).json({ error: err.message });
    }
};

const limits = {
    fileSize: 1024 * 1024 * 5 
};

const upload = multer({
    storage: storage,
    limits: limits,
    fileFilter: fileFilter
}).fields([
    { name: 'aadharCardFront', maxCount: 1 },
    { name: 'aadharCardBack', maxCount: 1 },
    { name: 'medicalInsuranceCardFront', maxCount: 1 },
    { name: 'medicalInsuranceCardBack', maxCount: 1 }
]);

module.exports = { multerErrorHandler, upload, storage };
