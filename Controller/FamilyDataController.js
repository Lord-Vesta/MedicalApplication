const {
  listFamilyData,
  listSpecificData,
  addFamilyData,
  editfamilydata,
} = require("../Models/models.js");

const { verifyToken } = require("../Utils/jwtutils.js");

// @desc Gets all family data
// @route GET /api/FamilyData
// @access private
const getFamilyData = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    let decodedToken = verifyToken(authHeader);
    if (decodedToken.data.roles === "admin") {
      listFamilyData(async function (result) {
        if (result.length > 0) {
          res.status(201).json({
            status: 201,
            message: "data is fetched successfully",
            data: result,
          });
        } else if (result.length <= 0) {
          console.log("result.length");
          res.status(200).json({
            status: 200,
            data: result,
          });
        }
      });
    } else if (decodedToken.data.roles === "user") {
      const Id = decodedToken.data.ID;
      listSpecificData(Id, async function (result) {
        if (result.length > 0) {
          res.status(201).json({
            status: 201,
            message: "data is fetched successfully",
            data: result,
          });
        } else if (result.length <= 0) {
          res.status(204).json({
            status: 204,
            message: "no content is avaliable",
            data: result,
          });
        }
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ status: 500, error: "Server error", message: err.message });
  }
};

// @desc Add family data
// @route POST /api/FamilyData
// @access private
const AddFamilyData = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    let decodedToken = verifyToken(authHeader);
    // if (decodedToken.data.roles === "user") {
    const Id = decodedToken.data.ID;

    listSpecificData(Id, async function (result) {
      if (result.length > 0) {
        res.status(409).json({
          status: 409,
          error: "data already exists",
          message: "Family Data for this Id is already present",
        });
      } else {
        addFamilyData(decodedToken.data.ID, req.body, async function (result) {
          if (result) {
            res.status(200).json({
              status: 200,
              message: "data is successfully added to familyData",
              data: result,
            });
          }
        });
      }
    });
  } catch (e) {
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message,
    });
  }
};

// @desc Edit family data
// @route PUT /api/FamilyData
// @access private
const EditFamilyData = (req, res) => {
  try {
    const Id = parseInt(req.params.id);
    // console.log(req.body);
    let allowedColumns = [
      "FathersName",
      "FathersAge",
      "FathersCountry",
      "MothersName",
      "mothersAge",
      "motherCountry",
      "diabetic",
      "preDiabetic",
      "CardiacPast",
      "cardiacPresent",
      "bloodPressure",
    ];
    let stmts = [];
    let values = [];
    const authHeader = req.headers["authorization"];
    let decodedToken = verifyToken(authHeader);
    // console.log(decodedToken);
    if (decodedToken.data.roles === "admin") {
      console.log(req.body); 
      for (let c of allowedColumns) {
        if (c in req.body) {
          stmts.push(`${c} = ?`), values.push(req.body[c]);
        }
      }
      if (stmts.length == 0) {
        return res.sendStatus(204); //nothing to do
      }

      values.push(Id);
      editfamilydata(stmts, values, async function (result) {
        if (result) {
          res.status(200).json({
            status: "Successfully Editted",
            data: result,
          });
        } else {
          res.status(400).json({
            status: "No data found",
          });
        }
      });
    } else {
      if (decodedToken.data.ID == req.params.id) {
        for (let c of allowedColumns) {
          if (c in req.body) {
            stmts.push(`${c} = ?`), values.push(req.body[c]);
          }
        }
        if (stmts.length == 0) {
          return res.sendStatus(204); //nothing to do
        }
  
        values.push(Id);
        editfamilydata(stmts, values, async function (result) {
          if (result) {
            res.status(200).json({
              status: "Successfully Editted",
              data: result,
            });
          } else {
            res.status(400).json({
              status: "No data found",
            });
          }
        });
      } else {
        res.status(403).json({
          status: 403,
          error: "Invalid User Role",
          message: "You are not authorized to perform this action.",
        }
        );
      }
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: 500, error: "Server error", message: err.message });
  }
};

module.exports = { getFamilyData, AddFamilyData, EditFamilyData };
