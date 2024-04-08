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
// const uploadMedicalInsuranceFront = upload.single('medicalInsuranceCardFront');
// const handleUploadMedicalInsuranceFront = (req, res) => {
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
// const uploadMedicalInsuranceBack = upload.single('medicalInsuranceCardBack');
// const handleUploadMedicalInsuranceBack = (req, res) => {
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
//   uploadMedicalInsuranceFront,
//   uploadMedicalInsuranceBack
// };

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const db = require('../Config/config');
const jwt = require('jsonwebtoken');


const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
});


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      const { userId } = req.body;
      cb(null, `user_${userId}_${Date.now().toString()}_${file.originalname}`);
    }
  })
});


const uploadAadharFront = upload.single('aadharCardFront');
const handleUploadAadharFront = (req, res) => {
  try {
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, "shhhh");
    const userId = decoded.ID;
    const s3Url = req.file.location;

    db.query('UPDATE UploadedDocuments SET aadharCardFront = ? WHERE userId = ?', [s3Url, userId], (err, result) => {
      if (err) {
        console.error('Error storing Aadhar card front URL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Aadhar card front uploaded successfully' });
    });
  } catch (error) {
    console.error("Error uploading Aadhar card front:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const uploadAadharBack = upload.single('aadharCardBack');
const handleUploadAadharBack = (req, res) => {
  try {
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, "shhhh");
    const userId = decoded.ID;
    const s3Url = req.file.location;

    db.query('UPDATE UploadedDocuments SET aadharCardBack = ? WHERE userId = ?', [s3Url, userId], (err, result) => {
      if (err) {
        console.error('Error storing Aadhar card back URL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Aadhar card back uploaded successfully' });
    });
  } catch (error) {
    console.error("Error uploading Aadhar card back:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const uploadMedicalInsuranceFront = upload.single('medicalInsuranceCardFront');
const handleUploadMedicalInsuranceFront = (req, res) => {
  try {
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, "shhhh");
    const userId = decoded.ID;
    const s3Url = req.file.location;

    db.query('UPDATE UploadedDocuments SET medicalInsuranceCardFront = ? WHERE userId = ?', [s3Url, userId], (err, result) => {
      if (err) {
        console.error('Error storing medical insurance card front URL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Medical insurance card front uploaded successfully' });
    });
  } catch (error) {
    console.error("Error uploading medical insurance card front:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const uploadMedicalInsuranceBack = upload.single('medicalInsuranceCardBack');
const handleUploadMedicalInsuranceBack = (req, res) => {
  try {
    let token = req.headers.authorization;
    const decoded = jwt.verify(token, "shhhh");
    const userId = decoded.ID;
    const s3Url = req.file.location;

    db.query('UPDATE UploadedDocuments SET medicalInsuranceCardBack = ? WHERE userId = ?', [s3Url, userId], (err, result) => {
      if (err) {
        console.error('Error storing medical insurance card back URL:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.status(200).json({ message: 'Medical insurance card back uploaded successfully',
    data:result });
    });
  } catch (error) {
    console.error("Error uploading medical insurance card back:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  handleUploadAadharFront,
  handleUploadAadharBack,
  handleUploadMedicalInsuranceFront,
  handleUploadMedicalInsuranceBack
};