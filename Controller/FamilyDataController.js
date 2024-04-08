const db = require("../Config/config");

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
          res.status(200).json({
            status: "fetched",
            data: result,
          });
        } else {
          res.status(400).json({
            status: "No data found",
          });
        }
      });
    } else {
      const Id = decodedToken.data.ID;
      listSpecificData(Id, async function (result) {
        if (result.length > 0) {
          res.status(200).json({
            status: "fetched",
            data: result,
          });
        } else {
          res.status(400).json({
            status: "No data found",
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
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
        res.status(200).json({
          status: "Data already exists",
        });
      } else {
        const {
          FathersName,
          FathersAge,
          FathersCountry,
          MothersName,
          mothersAge,
          motherCountry,
          diabetic,
          preDiabetic,
          CardiacPast,
          cardiacPresent,
          bloodPressure,
        } = req.body;

        addFamilyData(
          decodedToken.data.ID,
          FathersName,
          FathersAge,
          FathersCountry,
          MothersName,
          mothersAge,
          motherCountry,
          diabetic,
          preDiabetic,
          CardiacPast,
          cardiacPresent,
          bloodPressure,
          async function (result) {
            if (result) {
              res.status(200).json({
                status: "fetched",
                data: result,
              });
            } else {
              res.status(400).json({
                status: "No data found",
              });
            }
          }
        );
      }
    });
    // } else {
    //   res.status(404).json({ error: "Invalid User Role" });
    // }
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Edit family data
// @route PUT /api/FamilyData
// @access private
const EditFamilyData = (req, res) => {
  try{
    const {
      FathersName,
      FathersAge,
      FathersCountry,
      MothersName,
      mothersAge,
      motherCountry,
      diabetic,
      preDiabetic,
      CardiacPast,
      cardiacPresent,
      bloodPressure,
    } = req.body;
    const authHeader = req.headers["authorization"];
    let decodedToken = verifyToken(authHeader);
    if (decodedToken.data.roles === "admin") {
    const Id = parseInt(req.params.id);
    editfamilydata(
      Id,
      FathersName,
      FathersAge,
      FathersCountry,
      MothersName,
      mothersAge,
      motherCountry,
      diabetic,
      preDiabetic,
      CardiacPast,
      cardiacPresent,
      bloodPressure,
      async function (result) {
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
      }
    );
  } else {
    if (decodedToken.data.ID === req.params.id){
      const Id = parseInt(req.params.id);
      editfamilydata(
        Id,
        FathersName,
        FathersAge,
        FathersCountry,
        MothersName,
        mothersAge,
        motherCountry,
        diabetic,
        preDiabetic,
        CardiacPast,
        cardiacPresent,
        bloodPressure,
        async function (result) {
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
        }
      );
    }
    else{
      res.status(404).json({ error: "Edit your own data"});
    }
  }
  }catch(err){
    res.status(500).json({ error: "Server error" });
  }
  
};

module.exports = { getFamilyData, AddFamilyData, EditFamilyData };
