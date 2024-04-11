const bcrypt = require("bcryptjs");
const {
  checkAlreadyPresent,
  insertIntoData,
  deleteData,
  ListData,
} = require("../Models/models.js");
const { verifyToken } = require("../Utils/jwtutils.js");

// @desc Add User registration data
// @route POST /api/PatientData
// @access public
const addRegistrationData = (req, res) => {
  try {
    // const { Email, Passwords } = req.body;
    const roles = "user";
    const flag = true;
    const {
      body: { Email, Password },
    } = req;
    checkAlreadyPresent(Email, async function (result) {
      if (result.length) {
        res.status(409).json({
          status: 409,
          error: "Email already exists",
          message:
            "The email address provided is already registered. Please use a different email or proceed to login.",
        });
      } else {
        const myEncPassword = await bcrypt.hash(Password, 10);
        // why do we use 10? -> if more than 10 then large time or less then security
        insertIntoData(
          Email,
          myEncPassword,
          roles,
          flag,
          async function (resut) {
            if (resut) {
              res.status(201).json({
                status: 201,
                message: "User has been successfully registered",
              });
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message,
    });
  }
};

// @desc Delete registered data
// @route Delete /api/PatientData/:id
// @access private
const deleteRegistrationData = (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    verifyToken(authHeader);
    let decodedToken = verifyToken(authHeader);
    const Id = parseInt(req.params.id);

    if (decodedToken.data.roles === "admin") {
      deleteData(Id, async function (result) {
        if (result.affectedRows === 0) {
          res.status(404).json({
            status: 404,
            error: "Resource not found",
            message:
              "The requested resource with the provided ID was not found.",
          });
        } else {
          res.status(201).json({
            status: 201,
            message: "user has been successfully deleted",
            data: result,
          });
        }
      });
    } else if (decodedToken.data.roles === "user") {
      if (decodedToken.data.ID == req.params.id) {
        const Id = parseInt(req.params.id);
        deleteData(Id, function (err, result) {
          if (err) {
            throw err;
          } else {
            res.status(201).json({
              status: 201,
              message: "user has been successfully deleted",
              data: result,
            });
          }
        });
      } else {
        res.status(403).json({
          status: 403,
          error: "Invalid User Role",
          message: "You are not authorized to perform this action.",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message,
    });
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
        if (result.length > 0) {
          res.status(200).json({
            status: 200,
            data:result,
            message: "user has been successfully fetched",
          });
          console.log(result.length);
        } else if (result.length <= 0) {
          res.status(201).json({
            status: 201,
            message: "no content is avaliable",
            data: result,
          });
        }
      });
    } else {
      res.status(403).json({
        status: 403,
        error: "Invalid User Role",
        message: "You are not authorized to perform this action.",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message,
    });
  }
};

// @desc Delete registered data
// @route Delete /api/PatientData/:id
// @access private
const addAdminRegistration = (req, res) => {
  try {
    // const { Email, passwords } = req.body;
    const {
      body: { Email, Password },
    } = req;
    const authHeader = req.headers["authorization"];
    let decodedToken = verifyToken(authHeader);
    const roles = "admin";
    const flag = true;
    if (decodedToken.data.roles === "admin") {
      checkAlreadyPresent(Email, async function (result) {
        if (result.length) {
          // result.length true or false
          res.status(409).json({
            status: 409,
            error: "Email already exists",
            message:
              "The email address provided is already registered. Please use a different email or proceed to login.",
          });
        } else {
          const myEncPassword = await bcrypt.hash(Password, 10);
          // why do we use 10? -> if more than 10 then large time or less then security
          insertIntoData(
            Email,
            myEncPassword,
            roles,
            flag,
            async function (resut) {
              if (resut) {
                res.status(201).json({
                  status: 201,
                  message: "User has been successfully registered",
                  data:resut
                });
              }
            }
          );
        }
      });
    } else {
      res.status(403).json({
        status: 403,
        error: "Invalid User Role",
        message: "You are not authorized to perform this action.",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 500,
      error: "Server error",
      message: err.message,
    });
  }
};

module.exports = {
  addRegistrationData,
  deleteRegistrationData,
  listRegistration,
  addAdminRegistration,
};
