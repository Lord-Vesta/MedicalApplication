// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const db = require('../Config/config');
// const jwt = require('jsonwebtoken');

// // Configure AWS SDK
// const s3 = new aws.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_BUCKET_REGION
// });

// // Multer storage configuration for uploading directly to S3
// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     acl: 'public-read',
//     contentType: multerS3.AUTO_CONTENT_TYPE,
//     key: function (req, file, cb) {
//       const { userId } = req.body;
//       cb(null, `user_${userId}_${Date.now().toString()}_${file.originalname}`);
//     }
//   })
// });

// // Upload Aadhar card front
// const uploadAadharFront = upload.single('aadharCardFront');
// const handleUploadAadharFront = (req, res) => {
//   try {
//     let token = req.headers.authorization;
//     const decoded = jwt.verify(token, "shhhh");
//     const userId = decoded.ID;
//     const s3Url = req.file.location;

//     db.query('UPDATE UploadedDocuments SET aadharCardFront = ? WHERE userId = ?', [s3Url, userId], (err, result) => {
//       if (err) {
//         console.error('Error storing Aadhar card front URL:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       res.status(200).json({ message: 'Aadhar card front uploaded successfully' });
//     });
//   } catch (error) {
//     console.error("Error uploading Aadhar card front:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Upload Aadhar card back
// const uploadAadharBack = upload.single('aadharCardBack');
// const handleUploadAadharBack = (req, res) => {
//   try {
//     let token = req.headers.authorization;
//     const decoded = jwt.verify(token, "shhhh");
//     const userId = decoded.ID;
//     const s3Url = req.file.location;

//     db.query('UPDATE UploadedDocuments SET aadharCardBack = ? WHERE userId = ?', [s3Url, userId], (err, result) => {
//       if (err) {
//         console.error('Error storing Aadhar card back URL:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       res.status(200).json({ message: 'Aadhar card back uploaded successfully' });
//     });
//   } catch (error) {
//     console.error("Error uploading Aadhar card back:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Upload medical insurance card front
// const uploadmedicalInsuranceCardFront = upload.single('medicalInsuranceCardFront');
// const handleUploadmedicalInsuranceCardFront = (req, res) => {
//   try {
//     let token = req.headers.authorization;
//     const decoded = jwt.verify(token, "shhhh");
//     const userId = decoded.ID;
//     const s3Url = req.file.location;

//     db.query('UPDATE UploadedDocuments SET medicalInsuranceCardFront = ? WHERE userId = ?', [s3Url, userId], (err, result) => {
//       if (err) {
//         console.error('Error storing medical insurance card front URL:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       res.status(200).json({ message: 'Medical insurance card front uploaded successfully' });
//     });
//   } catch (error) {
//     console.error("Error uploading medical insurance card front:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// // Upload medical insurance card back
// const uploadmedicalInsuranceCardBack = upload.single('medicalInsuranceCardBack');
// const handleUploadmedicalInsuranceCardBack = (req, res) => {
//   try {
//     let token = req.headers.authorization;
//     const decoded = jwt.verify(token, "shhhh");
//     const userId = decoded.ID;
//     const s3Url = req.file.location;

//     db.query('UPDATE UploadedDocuments SET medicalInsuranceCardBack = ? WHERE userId = ?', [s3Url, userId], (err, result) => {
//       if (err) {
//         console.error('Error storing medical insurance card back URL:', err);
//         return res.status(500).json({ error: 'Internal Server Error' });
//       }
//       res.status(200).json({ message: 'Medical insurance card back uploaded successfully' });
//     });
//   } catch (error) {
//     console.error("Error uploading medical insurance card back:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// module.exports = {
//   uploadAadharFront,
//   uploadAadharBack,
//   uploadmedicalInsuranceCardFront,
//   uploadmedicalInsuranceCardBack
// };


// ---------------------------------------------------------------------------
// const express = require('express');
// const multer = require('multer');
// const fs = require('fs').promises;
// const app = express();
// const uuid = require('uuid').v4;

// // Pattern uuid-originalName
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads")
//     },
//     filename: (req, file, cb) => {
//         const { originalname } = file;
//         cb(null, `${uuid()}-${originalname}`);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.split("/")[0] === "image") {
//         cb(null, true);
//     } else {
//         cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
//     }
// };

// const upload = multer({
//     storage,
//     fileFilter,
//     limits: { fileSize: 10000000, files: 4 } 
// });

// app.post("/uploads", upload.fields([
//     { name: 'aadharCardFront', maxCount: 1 },
//     { name: 'aadharCardBack', maxCount: 1 },
//     { name: 'medicalInsuranceCardFront', maxCount: 1 },
//     { name: 'medicalInsuranceCardBack', maxCount: 1 }
// ]), async (req, res, next) => {
//     const { aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack } = req.files;

//     try {
//         // Check if all required fields are present
//         if (!aadharCardFront || !aadharCardBack || !medicalInsuranceCardFront || !medicalInsuranceCardBack) {
//             return res.status(400).json({ message: "Please upload exactly 4 images." });
//         }

//         // Update files
//         await updateFileIfExists('aadharCardFront', aadharCardFront[0]);
//         await updateFileIfExists('aadharCardBack', aadharCardBack[0]);
//         await updateFileIfExists('medicalInsuranceCardFront', medicalInsuranceCardFront[0]);
//         await updateFileIfExists('medicalInsuranceCardBack', medicalInsuranceCardBack[0]);

//         res.status(200).json({ message: "Files updated successfully!" });
//     } catch (error) {
//         console.error("Error updating files:", error);
//         res.status(500).json({ message: "Internal server error." });
//     }
// });

// async function updateFileIfExists(fieldName, file) {
//     const filePath = `uploads/${fieldName}`;
//     try {
//         await fs.unlink(filePath); 
//     } catch (error) {
//         if (error.code !== 'ENOENT') {
//             throw error;
//         }
//     }
//     await fs.rename(file.path, filePath); // Rename and move the new file
// }

// // Error Handling
// app.use((error, req, res, next) => {
//     if (error instanceof multer.MulterError) {
//         if (error.code === "LIMIT_FILE_SIZE") {
//             return res.status(400).json({
//                 message: "Image size is too large. Please resize the image and upload it."
//             });
//         }
//         if (error.code === "LIMIT_FILE_COUNT") {
//             return res.status(400).json({
//                 message: "Please upload exactly 4 images."
//             })
//         }
//         if (error.code === "LIMIT_UNEXPECTED_FILE") {
//             return res.status(400).json({
//                 message: "File must be an image only"
//             })
//         }
//     }
// });

// app.listen(4000, () => {
//     console.log('Listening on port 4000');
// });

// const fs = require('fs').promises;
// const { verifyToken } = require('../Utils/jwtutils');

// async function uploadDocuments(req, res) {
//     try {
//         // Verify token
//         const token = req.headers['authorization'];
//         const decodedToken = verifyToken(token);
//         if (!decodedToken.success) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const { aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack } = req.files;

//         // Check if all required files are present
//         if (!aadharCardFront || !aadharCardBack || !medicalInsuranceCardFront || !medicalInsuranceCardBack) {
//             return res.status(400).json({ message: "Please upload all required documents." });
//         }

//         // Process and store each document
//         await processAndStoreDocument('aadharCardFront', aadharCardFront);
//         await processAndStoreDocument('aadharCardBack', aadharCardBack);
//         await processAndStoreDocument('medicalInsuranceCardFront', medicalInsuranceCardFront);
//         await processAndStoreDocument('medicalInsuranceCardBack', medicalInsuranceCardBack);

//         res.status(200).json({ message: "Documents uploaded successfully!" });
//     } catch (error) {
//         console.error("Error uploading documents:", error);
//         if (error instanceof multer.MulterError) {
//             if (error.code === "LIMIT_FILE_SIZE") {
//                 return res.status(400).json({
//                     message: "Image size is too large. Please resize the image and upload it."
//                 });
//             }
//             if (error.code === "LIMIT_FILE_COUNT") {
//                 return res.status(400).json({
//                     message: "Please upload exactly 4 images."
//                 })
//             }
//             if (error.code === "LIMIT_UNEXPECTED_FILE") {
//                 return res.status(400).json({
//                     message: "File must be an image only"
//                 })
//             }
//         }
//         res.status(500).json({ message: "Internal server error." });
//     }
// }

// async function updateDocuments(req, res) {
//     try {
  
//         const token = req.headers['authorization'];
//         const decodedToken = verifyToken(token);
//         if (!decodedToken.success) {
//             return res.status(401).json({ message: 'Unauthorized' });
//         }

//         const { aadharCardFront, aadharCardBack, medicalInsuranceCardFront, medicalInsuranceCardBack } = req.files;

//         if (!aadharCardFront || !aadharCardBack || !medicalInsuranceCardFront || !medicalInsuranceCardBack) {
//             return res.status(400).json({ message: "Please upload all required documents." });
//         }

        
//         await updateFileIfExists('aadharCardFront', aadharCardFront);
//         await updateFileIfExists('aadharCardBack', aadharCardBack);
//         await updateFileIfExists('medicalInsuranceCardFront', medicalInsuranceCardFront);
//         await updateFileIfExists('medicalInsuranceCardBack', medicalInsuranceCardBack);

//         res.status(200).json({ message: "Documents updated successfully!" });
//     } catch (error) {
//         console.error("Error updating documents:", error);
//         if (error instanceof multer.MulterError) {
//             if (error.code === "LIMIT_FILE_SIZE") {
//                 return res.status(400).json({
//                     message: "Image size is too large. Please resize the image and upload it."
//                 });
//             }
//             if (error.code === "LIMIT_FILE_COUNT") {
//                 return res.status(400).json({
//                     message: "Please upload exactly 4 images."
//                 })
//             }
//             if (error.code === "LIMIT_UNEXPECTED_FILE") {
//                 return res.status(400).json({
//                     message: "File must be an image only"
//                 })
//             }
//         }
//         res.status(500).json({ message: "Internal server error." });
//     }
// }

// async function processAndStoreDocument(fieldName, file) {
//     const filePath = `uploads/${fieldName}`;
//     try {
    
//         await fs.access(filePath);
//         await fs.unlink(filePath);
//     } catch (error) {
//         if (error.code !== 'ENOENT') {
//             throw error;
//         }
//     }

 
//     await fs.rename(file.path, filePath);
// }

// module.exports = { uploadDocuments, updateDocuments };


// --------------------------------------


// const multer = require('multer');
// const path = require("node:path")
// const uuid = require('uuid').v4;




// app.use((error, req, res, next) => {
//   if (error instanceof multer.MulterError) {
//     if (error.code === "LIMIT_FILE_SIZE") {
//       return res.status(413).json({
//         message: "file is too large",
//       });
//     }

//     if (error.code === "LIMIT_FILE_COUNT") {
//       return res.status(400).json({
//         message: "File limit reached",
//       });
//     }

//     if (error.code === "LIMIT_UNEXPECTED_FILE") {
//       return res.status(400).json({
//         message: "File must be an image",
//       });
//     }
//   }
// });

  // console.log(req.body);
  // const storage = multer.diskStorage({
  //   destination: (req, file, cb) => {
  //     cb(null, "uploads");
  //   },
  //   filename: (req, file, cb) => {
  //     const { originalname } = file;
  //     cb(null, `${uuid()}-${originalname}`);
  //   },
  // });

  

  const { uploadDocument } = require("../Models/models.js");
const { verifyToken } = require('../Utils/jwtutils');

const uploadDocuments = async (req, res) => {
  try {

    const authHeader = req.headers["authorization"];
    const decodedToken = verifyToken(authHeader);
    console.log(decodedToken);
    const userId = decodedToken.data.ID;

   
    const {
      aadharCardFront,
      aadharCardBack,
      medicalInsuranceCardFront,
      medicalInsuranceCardBack
    } = req.files;

    console.log(aadharCardFront[0].path);
  
    uploadDocument(
      userId,
      aadharCardFront[0].path,
      aadharCardBack[0].path,
      medicalInsuranceCardFront[0].path,
      medicalInsuranceCardBack[0].path,
      (result) => {
        
        if (result.error) {
          console.error('Error uploading documents:', result.error);
          return res.status(500).json({
            status: 500,
            error: 'Database error',
            message: 'Failed to upload documents to the database'
          });
        } else {
          
          return res.status(201).json({
            status: 201,
            message: 'Files uploaded and stored in the database successfully!'
          });
        }
      }
    );
  } catch (error) {

    console.error('Error uploading documents:', error);
    return res.status(500).json({
      status: 500,
      error: 'Internal server error',
      message: 'Failed to upload documents'
    });
  } 
};

module.exports = {
  uploadDocuments
};
