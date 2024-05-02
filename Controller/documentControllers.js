import multer, { MulterError } from "multer";
import { v4 as uuidv4 } from 'uuid';
// const uuidv4 = uuidv4();
import { uploadDocument, ListSpecificUploadedDoc, updateDocumentPaths,checkDocAlreadyPresent } from '../Models/models.js';
import { verifyToken } from "../Utils/jwtutils.js";
// import { object } from "joi";
// import { version } from "joi";

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


// export const getSpecificUserDocuments=(req,res)=>{
//   try{
//     console.log("Inside get docs");
//     const authHeader =req.headers["authorization"];
//     const decodedToken=verifyToken(authHeader);
    

//     if(decodedToken.data.roles==="admin"){
//       try{
//         console.log("Inside get docs for admin");

//       }
//     }
//   }
// }


export const uploadDocuments = (req, res) => {
  try {
    console.log("inside upload docs");
    const authHeader = req.headers["authorization"];
    const decodedToken = verifyToken(authHeader);
    const Id = decodedToken.data.ID;
    console.log(Id);

    ListSpecificUploadedDoc(Id, async function (result) {
      console.log(result);
      if (result.length > 0) {
        return res.status(409).json({
          status: 409,
          error: "Documents already exist",
          message: "Documents for this ID already present"
        });
      } else {
        upload(req, res, async function (err) {
          console.log("inside upload fucntion");
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
              error: "File upload error1",
              message: errorMessage
            });
          }
          console.log("outside error msg");
          const fileFields = Object.keys(req.files);
          console.log(req.files);    
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
            function (result) {
              if (result) {
                console.log("result", result);
                res.status(200).json({
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
      error: "Server error3",
      message: e.message
    });
  }
};


export const updateDocument = async (req, res) => {
  try {
    console.log("Inside update doc");
    const authHeader = req.headers["authorization"];
    const decodedToken = verifyToken(authHeader);
    const userIdFromToken = decodedToken.data.ID;
    const id = parseInt(req.params.userId);
    console.log("This is the user Id from token: ", userIdFromToken);
    console.log("This is the requested user Id: ", id);
    let allowedColumns = [
      "aadharCardFront",
      "aadharCardBack",
      "medicalInsuranceCardFront",
      "medicalInsuranceCardBack"
    ];

    if (decodedToken.data.roles === "admin") {
   
      updateDocumentLogic(req, res, id);
    } else {
      
      if (userIdFromToken === id) {
        console.log(userIdFromToken);
        updateDocumentLogic(req, res, id);
      } else {
        return res.status(403).json({
          error: "Unauthorized",
          message: "You are not authorized to update documents for this user"
        });
      }
    }
  } catch (error) {
    console.error("Error occurred: ", error);
    
    return res.status(500).json({
      error: "Server error",
      message: "An unexpected error occurred"
    });
  }
};

const updateDocumentLogic = async (req, res, userId) => {
  try {
    checkDocAlreadyPresent(userId, async function (result) {
      // console.log(result);
      if (result.length > 0) {
        
        upload(req, res, async function (err) {
          // console.log("Inside update function");
          if (err) {
            let errorMessage = "Server error";
            if (err instanceof MulterError) {
              switch (err.code) {
                case "LIMIT_UNEXPECTED_FILE":
                  errorMessage = "File can only be in jpg/png/pdf";
                  break;
                case 'LIMIT_FILE_SIZE':
                  errorMessage = "File size exceeds the limit";
                  break;
                default:
                  errorMessage = err.message;
              }
            }
            return res.status(500).json({
              status: 500,
              error: "File update error",
              message: errorMessage
            });
          }
          // console.log("Files uploaded successfully");

          
          const filePaths = {
            aadharCardFront: req.files["aadharCardFront"][0].path,
            aadharCardBack: req.files["aadharCardBack"][0].path,
            medicalInsuranceCardFront: req.files["medicalInsuranceCardFront"][0].path,
            medicalInsuranceCardBack: req.files["medicalInsuranceCardBack"][0].path
          };
          // console.log(filePaths);

          
          updateDocumentPaths(userId,filePaths, function (result) {
            if (result) {
              console.log("Documents updated successfully");
              res.status(200).json({
                status: 200,
                message: "Documents updated successfully",
                data: result
              });
            }
          });
        });
      } else {
        return res.status(400).json({
          error: "No documents uploaded to update",
          message: "Please first upload the documents to update it later"
        });
      }
    });
  } catch (error) {
    console.error("Error occurred: ", error);

    return res.status(500).json({
      error: "Server error",
      message: "An unexpected error occurred"
    });
  }
};




