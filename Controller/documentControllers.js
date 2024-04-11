const { updateDocumentsModel } = require("../Models/models.js");
const { verifyToken } = require('../Utils/jwtutils');

const uploadDocuments = async (req, res) => {
  try {

    const authHeader = req.headers["authorization"];
    const decodedToken = verifyToken(authHeader);
    // console.log(decodedToken);
    const userId = decodedToken.data.ID;


    const {
      aadharCardFront,
      aadharCardBack,
      medicalInsuranceCardFront,
      medicalInsuranceCardBack
    } = req.files;

    // console.log(aadharCardFront[0].path);

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


const updateDocuments = (req, res) => {
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
        console.log(updateKey);
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
    // res.status(500).json({status:500,error:"Server error",message:err.message});
  }
};
module.exports = {
  uploadDocuments, updateDocuments
};
