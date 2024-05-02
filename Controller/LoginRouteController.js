// const bcrypt = require("bcryptjs");
// const { login } = require("../Models/models");
// const { generateJwt } = require("../Utils/jwtutils");

import bcrypt from "bcryptjs"
import {login} from "../Models/models.js"
import {generateJwt} from "../Utils/jwtutils.js"


// @desc check login data
// @route POST /api/login
// @access public

export const loginUser = (req, res) => {
  console.log(req.body);
  try {
    const {
      body: { Email, Password },
    } = req;
    console.log(login);
    login(Email, async function (result) {
      if (result.length > 0) {
        let userPassword = result[0].Password;
        let correctPassword = await bcrypt.compare(Password, userPassword);
        if (correctPassword) {
          
          const token = generateJwt(result[0]);
          res.status(200).json({
            status: 200,
            message: "Login successful",
            token: token,
          });
        } else {
          res.status(401).json({
            status: 401,
            error: "Unauthorized",
            message: "Incorrect username or password.",
          });
        }
      } else {
        res.status(401).json({
          status: 401,
          error: "Unauthorized",
          message: "Incorrect username or password.",
        });
      }
    });
  } catch (error) {
    res
      .status(500)
      .json({ 
        status: 500, 
        error: "Server error", 
        message: err.message });
  }
};

// module.exports = {
//   loginUser,
// };

