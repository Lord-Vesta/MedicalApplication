const { validationResult } = require('express-validator');

const tryUploadDocs = (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        const uploadedFiles = req.files;
        const fieldPaths = {};

        for (const fieldName in uploadedFiles) {
            const file = uploadedFiles[fieldName][0];
            const filePath = file.path;
            fieldPaths[fieldName] = filePath;
        }

        res.status(200).send({ success: true, fieldPaths });
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
};



module.exports = tryUploadDocs;




// const { verifyToken } = require('../Utils/jwtutils');
// const path = require('path');

// const tryUploadDocs = (req, res) => {
//     try {
//         const authHeader = req.headers["authorization"];
//         const decodedToken = verifyToken(authHeader);
//         const userId = decodedToken.data.ID;

//         if (req.multerError) {
//             if (req.multerError instanceof multer.MulterError) {
//                 if (req.multerError.code === "LIMIT_FILE_SIZE") {
//                     return res.status(400).send("File size is too large. Maximum file size allowed is 10MB.");
//                 } else if (req.multerError.code === "LIMIT_FILE_COUNT") {
//                     return res.status(400).send("Exceeded maximum number of files allowed.");
//                 } else if (req.multerError.code === "LIMIT_UNEXPECTED_FILE") {
//                     return res.status(400).send("Uploaded unexpected file type.");
//                 }
//             } else {
//                 throw req.multerError; 
//             }
//         }

//         if (!req.files || Object.keys(req.files).length === 0) {
//             return res.status(400).send('No files were uploaded.');
//         }

//         const fieldPaths = {};

//         // Loop through each field name in req.files
//         for (const fieldName in req.files) {
//             // Get the file array for the current field name
//             const filesArray = req.files[fieldName];
            
//             // Since maxCount is 1, there should be only one file in the array
//             const file = filesArray[0];

//             // Extract the file path from the file object
//             const filePath = file.path;

//             // Add the field name and its corresponding file path to the fieldPaths object
//             fieldPaths[fieldName] = filePath;
//         }

        
//         console.log(fieldPaths);

       

//         res.send("Files uploaded successfully!");
//     } catch (error) {
//         console.error("An unexpected error occurred:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };

// module.exports = {tryUploadDocs};
