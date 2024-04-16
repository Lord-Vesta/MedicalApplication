
import  multer from "multer";
import { v4 as uuidv4 } from 'uuid';
// const uuidv4 = uuidv4();
import {uploadDocument,ListSpecificUploadedDoc,updateDocumentsModel,}  from '../Models/models.js';
import { verifyToken }  from "../Utils/jwtutils.js";

 const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadedDocuments/'); 
  },
  filename: function (req, file, cb) {
 
    cb(null, uuidv4() + '-' + file.originalname);
  }
});


 const fileFilter = function (req, file, cb) {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
    cb(null, true); 
  } else {
    cb(null, false); 
  }
};


 const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, 
    files: 4 
  }
}).fields([
  { name: 'aadharCardFront', maxCount: 1 },
  { name: 'aadharCardBack', maxCount: 1 },
  { name: 'medicalInsuranceCardFront', maxCount: 1 },
  { name: 'medicalInsuranceCardBack', maxCount: 1 }
]);

// const uploadDocuments = (req, res) => {
//   try {
//     const authHeader = req.headers["authorization"];
//     const decodedToken = verifyToken(authHeader);
//     const Id = decodedToken.data.ID;
//     ListSpecificUploadedDoc(Id, async function (result) {
//       if (result.length > 0) {
//         res.status(409).json({
//           status: 409,
//           error: "Documents already exist",
//           message: "Documents for this ID already present"
//         });
//       } else {
//         upload(req, res, async function (err) {
//           if (err instanceof multer.MulterError) {
//             if (err.code === 'LIMIT_UNEXPECTED_FILE') {
//               res.status(400).json({
//                 status: 400,
//                 error: "File upload error",
//                 message: "Unexpected number of files uploaded"
//               });
//             } else if (err.code === 'LIMIT_FILE_SIZE') {
//               res.status(400).json({
//                 status: 400,
//                 error: "File upload error",
//                 message: "File size exceeds the limit"
//               });
//             } else if (err.code === 'LIMIT_FILE_COUNT') {
//               res.status(400).json({
//                 status: 400,
//                 error: "File upload error",
//                 message: "Maximum file count exceeded"
//               });
//             } else {
//               res.status(500).json({
//                 status: 500,
//                 error: "Server error",
//                 message: err.message
//               });
//             }
//           } else if (err) {
//             res.status(500).json({
//               status: 500,
//               error: "Server error",
//               message: err.message
//             });
//           } else {
//             const fileFields = Object.keys(req.files);
//             if (fileFields.length !== 4) {
//               res.status(400).json({
//                 status: 400,
//                 error: "File upload error",
//                 message: "Exactly 4 files should be uploaded"
//               });
//             } else {
            
//               const filePaths = {
//                 aadharCardFront: req.files['aadharCardFront'][0].path,
//                 aadharCardBack: req.files['aadharCardBack'][0].path,
//                 medicalInsuranceCardFront: req.files['medicalInsuranceCardFront'][0].path,
//                 medicalInsuranceCardBack: req.files['medicalInsuranceCardBack'][0].path
//               };

            
//               uploadDocument(Id,
//                 filePaths.aadharCardFront,
//                 filePaths.aadharCardBack,
//                 filePaths.medicalInsuranceCardFront,
//                 filePaths.medicalInsuranceCardBack,
//                 function (err, result) {
//                   if (err) {
//                     res.status(500).json({
//                       status: 500,
//                       error: "Server error",
//                       message: err.message
//                     });
//                   } else {
//                     res.status(200).json({
//                       status: 200,
//                       message: "Documents uploaded successfully",
//                       data: result 
//                     });
//                   }
//                 }
//               );
//             }
//           }
//         });
//       }
//     });
//   } catch (e) {
//     res.status(500).json({
//       status: 500,
//       error: "Server error",
//       message: e.message
//     });
//   }
// }
export const uploadDocuments = (req, res) => {
    try {
      const authHeader = req.headers["authorization"];
      const decodedToken = verifyToken(authHeader);
      const Id = decodedToken.data.ID;

    // const {user:{data : {ID}}} = req;

      ListSpecificUploadedDoc(Id, async function (result) {
        if (result.length > 0) {
          return res.status(409).json({
            status: 409,
            error: "Documents already exist",
            message: "Documents for this ID already present"
          });
        } else {
          upload(req, res, async function (err) {
            if (err) {
              let errorMessage = "Server error";
              if (err instanceof multer.MulterError) {
                switch (err.code) {
                  case 'LIMIT_UNEXPECTED_FILE':
                    errorMessage = "Unexpected number of files uploaded";
                    break;
                  case 'LIMIT_FILE_SIZE':
                    errorMessage = "File size exceeds the limit";
                    break;
                  case 'LIMIT_FILE_COUNT':
                    errorMessage = "Maximum file count exceeded";
                    break;
                  default:
                    errorMessage = err.message;
                }
              }
  
              return res.status(500).json({
                status: 500,
                error: "File upload error",
                message: errorMessage
              });
            }
  
            const fileFields = Object.keys(req.files);
            if (fileFields.length !== 4) {
              return res.status(400).json({
                status: 400,
                error: "File upload error",
                message: "Exactly 4 files should be uploaded"
              });
            }
  
            const filePaths = {
              aadharCardFront: req.files['aadharCardFront'][0].path,
              aadharCardBack: req.files['aadharCardBack'][0].path,
              medicalInsuranceCardFront: req.files['medicalInsuranceCardFront'][0].path,
              medicalInsuranceCardBack: req.files['medicalInsuranceCardBack'][0].path
            };
  
            uploadDocument(Id, 
                filePaths.aadharCardFront, 
                filePaths.aadharCardBack, 
                filePaths.medicalInsuranceCardFront, 
                filePaths.medicalInsuranceCardBack, 
                function (err, result) {
              if (err) {
                return res.status(500).json({
                  status: 500,
                  error: "Server error",
                  message: err.message
                });
              } else {
                return res.status(200).json({
                  status: 200,
                  message: "Documents uploaded successfully",
                  data: result
                });
              }
            });
          });
        }
      });
    } catch (e) {
      return res.status(500).json({
        status: 500,
        error: "Server error",
        message: e.message
      });
    }
  };
  



export const updateDocuments = (req, res) => {
  try {
    const Id = parseInt(req.params.id);
    let allColumns = [
      "aadharCardFront",
      "aadharCardBack",
      "medicalInsuranceCardFront",
      "medicalInsuranceCardBack"
    ];

    let updateKey = [];
    let updateValues = [];
    let arr = [];
    const authHeader = req.headers["authorization"];
    let decodedToken = verifyToken(authHeader);

    if (decodedToken.data.roles === "admin") {

      // console.log(cols);
        for(let c in Object.keys(req.files)){          
          updateKey.push(`${Object.keys(req.files)[c]} = ?`);
          updateValues.push(Object.values(req.files)[c][0].path);
        }
        // console.log(updateKey);
        // console.log(updateValues);
      if (updateKey.length === 0) {
        res.sendStatus(204);
      }
      
      updateValues.push(Id);
      // console.log(updateValues);
      updateDocumentsModel(updateKey, updateValues, async function (result) {
        // console.log("insidd");
        if (result) {
          // console.log(object);
          res.status(200).json({
            status: "Documents updated Successfully",
            data: result
          });
        } else {
          res.status(400).json({
            status: "No data found",

          });
        }
      });
    } else {
      if (decodedToken.data.ID === req.params.id) {
        const Id = parent(req.params.id);
        updateDocuments(Id, req.body, async function (result) {
          if (result) {
            res.status(403).json({
              status: 403,
              error: "Invalid user",
              message: "You are not authorized to perform this action."
            });
          }
        }
      );
      }
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message
    });
  }
};

// module.exports = {uploadDocuments,updateDocuments};



















