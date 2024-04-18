
import  multer from "multer";
import { v4 as uuidv4 } from 'uuid';
// const uuidv4 = uuidv4();
import {uploadDocument,ListSpecificUploadedDoc,updateDocumentsModel,}  from '../Models/models.js';
import { verifyToken }  from "../Utils/jwtutils.js";
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
                console.log("result",result);
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
  

//   const updateUpload = multer({
//     storage: storage,
//     fileFilter: fileFilter,
//     limits: {
//         fileSize: 5 * 1024 * 1024,
//     }
// }).fields([
//   {name: 'aadharCardFront', maxCount: 1 },
//   { name: 'aadharCardBack', maxCount: 1 },
//   { name: 'medicalInsuranceCardFront', maxCount: 1 },
//   { name: 'medicalInsuranceCardBack', maxCount: 1 }
// ])






export const updateDocuments=(req,res)=>{
  try{
    const authHeader=req.headers["authorization"];
    verifyToken(authHeader);
    let decodedToken=verifyToken(authHeader);
    if(decodedToken.data.roles==="admin"){
      updateDocumentsModel(Id,async function (result){
        if(result.affectedRows === 0){
          res.status(404).json({
            status:404,
            error:"Resource not found",
            message:"No documents found to be updated"

          });
         
        }
        else{
          res.status(201).json({
            status:201,
            message:"User updated successfully",
            data:result,
          });
        }
      });
    }
    else{
      res.status(403).json({
        status:403,
        error:"Invalid user role",
        message:"Yor are not authorized to perform this action.",
      });
    }
  }
  catch(err){
    res.status(500).json({
      status:500,
      error:"Server error",
      message:err.message,
    })
  }
}


// export const updateDocuments = async (req, res) => {
//   try {
//     const id = parseInt(req.params.userId);
//     const allowedFields = [
//       "aadharCardFront",
//       "aadharCardBack",
//       "medicalInsuranceCardFront",
//       "medicalInsuranceCardBack",
   
//     ];

//     let updatedFields=[];
//     let updatedValues=[];

//     const authHeader = req.headers["authorization"];
//     const decodedToken = verifyToken(authHeader);
  
//     if (decodedToken.data.roles !== "admin") {
//     console.log(allowedFields);
//     for (let c of allowedFields){
//       if(c in req.files){
//         updatedFields.push(`${c} = ?`),
//         updatedValues.push(req.files[c]);
//       }
//     }
//     console.log(updatedFields);
//     console.log(updatedValues);
//     }

//     const updates = {};
//     for (const field of allowedFields) {
//       if (req.files && field in req.files) {
//         updates[field] = req.files[field][0].path; // 
//       }
//     }

//     if (Object.keys(updates).length === 0) {
//       return res.status(204).json({
//         status:"no files provided to be updated",
       
//       })
//     }

//     const updatedDocument = await updateDocumentsModel(id, updates);

//     if (updatedDocument) {
//       res.status(200).json({
//         status: "Successfully Updated",
//         data: updatedDocument,
//       });
//     } else {
//       res.status(400).json({
//         status: "Document update failed",
//         message: "Failed to update document",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       status: 500,
//       error: "Server error",
//       message: err.message,
//     });
//   }
// };



// export const updateDocuments = (req, res) => {

//   try {
//     // console.log(req.files);
//     const Id = parseInt(req.params.id);
//     console.log(Id);
    


//     let allColumns = [
//       "aadharCardFront",
//       "aadharCardBack",
//       "medicalInsuranceCardFront",
//       "medicalInsuranceCardBack"
//     ];

//     let updateKey = [];
//     let updateValues = [];
//     let arr = [];
//     const authHeader = req.headers["authorization"];
//     let decodedToken = verifyToken(authHeader);
    
//     if (decodedToken.data.roles === "admin") {

//       console.log(req.files);
//         for(let c in Object.keys(req.files)){          
//           updateKey.push(`${Object.keys(req.files)[c]} = ?`);
//           updateValues.push(Object.values(req.files)[c][0].path);
//         }
//         console.log(updateKey);
//         console.log(updateValues);
//       if (updateKey.length === 0) {
//         res.sendStatus(204);
//       }
      
//       updateValues.push(Id);
//       console.log(updateValues);
//       updateDocumentsModel(updateKey, updateValues, async function (result) {
//         // console.log("insidd");
//         if (result) {
//           // console.log(object);
//           res.status(200).json({
//             status: "Documents updated Successfully",
//             data: result
//           });
//         } else {
//           res.status(400).json({
//             status: "No data found",

//           });
//         }
//       });
//     } else {
//       if (decodedToken.data.ID === req.params.id) {
//         const Id = parent(req.params.id);
//         updateDocuments(Id, req.body, async function (result) {
//           if (result) {
//             res.status(403).json({
//               status: 403,
//               error: "Invalid user",
//               message: "You are not authorized to perform this action."
//             });
//           }
//         }
//       );
//       }
//     }
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       error: "Server error",
//       message: err.message
//     });
//   }
// };

// export const updateDocuments = (req, res) => {
//   try {
//     const userId = parseInt(req.params.userId); 
//     const authHeader = req.headers["authorization"];
//     const decodedToken = verifyToken(authHeader);



//     if (!decodedToken || !decodedToken.data || !decodedToken.data.roles) {
//       return res.status(401).json({
//         status: 401,
//         error: "Unauthorized",
//         message: "You are not authorized to perform this action"
//       });
//     }

//     const updateKey = [];
//     const updateValues = [];

//     for (const field in req.files) {
//       const newPath = req.files[field][0].path;
//       updateKey.push(`${field} = ?`);
//       updateValues.push(newPath);
//     }

//     updateDocumentsModel(updateKey.join(', '), updateValues, async (result) => {
//       if (result) {
//         res.status(200).json({
//           status: "Documents updated successfully"
//         });
//       } else {
//         res.status(500).json({
//           status: 500,
//           error: "Server error",
//           message: "Failed to update documents"
//         });
//       }
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       error: "Server error",
//       message: err.message
//     });
//   }
// };


// export const updateDocuments = (req, res) => {
//   try {
//     const userId = parseInt(req.params.userId); 
//     const authHeader = req.headers["authorization"];
//     const decodedToken = verifyToken(authHeader);

//     if (!decodedToken || !decodedToken.data || !decodedToken.data.roles) {
//       return res.status(401).json({
//         status: 401,
//         error: "Unauthorized",
//         message: "You are not authorized to perform this action"
//       });
//     }

//     const updateKey = [];
//     const updateValues = [];

//     for (const field in req.files) {
//       const newPath = req.files[field][0].path;
//       updateKey.push(`${field} = ?`);
//       updateValues.push(newPath);
//     }

//     // Handle empty uploads
//     if (updateKey.length === 0) {
//       return res.status(400).json({
//         status: 400,
//         error: "No files uploaded",
//         message: "Please upload at least one document"
//       });
//     }

//     const updateString = updateKey.join(', ');

//     updateDocumentsModel(updateString, updateValues, async (result) => {
//       if (result) {
//         res.status(200).json({
//           status: "Documents updated successfully"
//         });
//       } else {
//         res.status(500).json({
//           status: 500,
//           error: "Server error",
//           message: "Failed to update documents"
//         });
//       }
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: 500,
//       error: "Server error",
//       message: err.message
//     });
//   }
// };