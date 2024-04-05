const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../Config/config.js");
const RegisterData = JSON.parse(fs.readFileSync("RegisterData.json"));

// @desc Add registration data
// @route POST /api/PatientData
// @access private
const AddRegistrationData = (req, res) => {
  const { Email, Passwords } = req.body;
  db.query(
    "Select * from CredentialData where Email = ?",
    [Email],
    async (error, results) => {
      if (error) {
        res.status(404).json({ error: error });
      }

      if (results.length > 0) {
        res.status(400).json({ error: "Email already exists" });
      }

      const myEncPassword = await bcrypt.hash(Passwords, 10);
      const token = jwt.sign({ Email, Passwords }, "shhhh", {
        expiresIn: "2h",
      });

      db.query(
        "insert into CredentialData(Email, passwords ,token) values (?,?,?)",
        [Email, myEncPassword, token],
        (error, result) => {
          if (error) {
            res.status(404).json({ error: error });
          } else {
            res.status(201).json({
              result: result,
            });
            console.log(result);
          }
        }
      );
    }
  );
};

// @desc Delete registered data
// @route Delete /api/PatientData/:id
// @access private
const DeleteRegistrationData = (req, res) => {
  let patientId = parseInt(req.params.id);
  let data = RegisterData;
  var removeByAttr = function (arr, attr, value) {
    var i = arr.length;
    while (i--) {
      if (
        arr[i] &&
        arr[i].hasOwnProperty(attr) &&
        arguments.length > 2 &&
        arr[i][attr] === value
      ) {
        arr.splice(i, 1);
      }
    }
    return arr;
  };
  const deletedData = removeByAttr(data, "id", patientId);
  fs.writeFile("RegisterData.json", JSON.stringify(deletedData), (err) => {
    res.status(201).json({
      status: deletedData,
    });
  });
  //   res.json(patientId - 1);
  console.log(patientId - 1);
};

// @desc Delete registered data
// @route Delete /api/PatientData/:id
// @access private
const listRegistration = (req, res) => {
  let q = "select * from CredentialData";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.json(data);
  });
};

module.exports = {
  listRegistration,
  AddRegistrationData,
  DeleteRegistrationData,
};
