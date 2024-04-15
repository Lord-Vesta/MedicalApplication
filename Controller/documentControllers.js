import {uploadDocument} from "../Models/models.js"
import {verifyToken} from "../Utils/jwtutils.js"

// console.log(uploadDocument);

export const uploadDocuments = async (req, res) => {
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

// module.exports = {
//   uploadDocuments
// };
