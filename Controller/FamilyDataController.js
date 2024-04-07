
const db = require("../Config/config");
const jwt = require("jsonwebtoken");
const { listFamilyData } = require("../Models/models");

// @desc Gets all family data
// @route GET /api/FamilyData
// @access private
const getFamilyData = (req, res) => {
  try {
    listFamilyData(async function (result){
      if(result.length > 0){
        res.status(200).json({
          status: "fetched",
          data: result,
        });
      } else{
        res.status(400).json({
          status: "No data found",
        });
      }
    })
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }

};

// @desc Add family data
// @route POST /api/FamilyData
// @access private
const AddFamilyData = (req, res) => {
  let token = req.headers.authorization;
  const decoded = jwt.verify(token, "shhhh");
  console.log(decoded);
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

  let q = `insert into FamilyData (Id,FathersName,FathersAge,FathersCountry,MothersName,mothersAge,motherCountry,diabetic,preDiabetic,CardiacPast,cardiacPresent,bloodPressure) values (?,?,?,?,?,?,?,?,?,?,?,?)`;
  db.query(
    q,
    [
      decoded.ID,
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
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Database error" });
      } else {
        res.json(result);
      }
    }
  );
};

// @desc Edit family data
// @route PUT /api/FamilyData
// @access private
const EditFamilyData = (req, res) => {
  let userId = req.params.id;
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

  let q = `update FamilyData set FathersName = ? ,FathersAge = ?, FathersCountry = ?,MothersName = ?,mothersAge = ?,motherCountry = ?,diabetic = ?,preDiabetic = ?,CardiacPast = ?,cardiacPresent = ?,bloodPressure = ? where Id = ${userId}`;

  db.query(
    q,
    [
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
    ],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "Database error" });
      } else {
        res.json(result);
      }
    }
  );
};

module.exports = { getFamilyData, AddFamilyData, EditFamilyData };