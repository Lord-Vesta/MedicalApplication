const bcrypt = require("bcryptjs");
const {
  checkAlreadyPresent,
  InsertintoData,
  deleteData,
  ListData,
} = require("../Models/models.js");
const { verifyToken } = require("../Utils/jwtutils.js");

// @desc Add registration data
// @route POST /api/PatientData
// @access private
const AddRegistrationData = (req, res) => {
  try {
    const { Email, Passwords, roles } = req.body;
    checkAlreadyPresent(Email, async function (result) {
      if (result.length > 0) {
        res.status(400).json({ error: "Email already exists" });
      } else {
        const myEncPassword = await bcrypt.hash(Passwords, 10);
        InsertintoData(Email, myEncPassword, roles, async function (resut) {
          if (resut) {
            res.status(201).json({
              status: "Successfully registered",
            });
          }
        });
      }
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Delete registered data
// @route Delete /api/PatientData/:id
// @access private
const DeleteRegistrationData = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    verifyToken(authHeader);
    let decodedToken = verifyToken(authHeader);
    console.log(decodedToken.data.ID);
    console.log(req.params.id);

    if (decodedToken.data.roles === "admin") {
      const Id = parseInt(req.params.id);
      console.log("decoded id", decodedToken.data.ID);
      deleteData(Id, async function (result) {
        console.log("Affected rows", result.affectedRows);
        if (result.affectedRows === 0) {
          res.status(400).json({
            error: "Id not found",
          });
        } else {
          console.log(result.affectedRows);
          res.status(201).json({
            status: "successfully Deleted",
          });
        }
      });
    } else if (decodedToken.data.roles === "user") {
      console.log("yash");
      console.log(decodedToken.data.ID == req.params.id);
      if (decodedToken.data.ID == req.params.id) {
        
        const Id = parseInt(req.params.id);
        deleteData(Id, function (err, result) {
          // if (err) {
          //   console.error("Error deleting data:", err);
          //   return res.status(500).json({ error: "Database error" });
          // }
          // console.log("resultUser",result);
          // if (result.affectedRows === 0) {
          //   return res.status(400).json({ error: "No rows deleted" });
          // } else {
            // console.log(result.affectedRows);
            return res.status(200).json({ status: "Successfully deleted" });
          // }
        });
      } else {
        return res.status(403).json({ error: "Invalid User Role" });
      }
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// @desc Delete registered data
// @route Delete /api/PatientData/:id
// @access private
const listRegistration = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    let decodedToken = verifyToken(authHeader);

    if (decodedToken.data.roles === "admin") {
      ListData(async function (result) {
        if (result.length === 0) {
          res.status(400).json({
            error: "No data found",
          });
        } else {
          res.status(201).json(result);
        }
      });
    } else {
      res.status(404).json({ error: "Invalid User Role" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  listRegistration,
  AddRegistrationData,
  DeleteRegistrationData,
};
