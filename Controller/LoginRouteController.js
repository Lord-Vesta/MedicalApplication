const db = require("../Config/config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { login } = require("../Models/models");
const { generateJwt } = require("../Utils/jwtutils");


// @desc check login data
// @route POST /api/login
// @access public

const loginUser = (req, res) => {
  try {
    let { email, password } = req.body;
    login(email, async function (result) {
      if (result.length > 0) {
        let userPassword = result[0].passwords;
        let correctPassword = await bcrypt.compare(password, userPassword);
        if (correctPassword) {
          const token = generateJwt(result[0])
          res.status(201).json({ Status: "successfull", Token: token });
        } else {
          res.status(400).json("wrong password");
        }
      } else {
        res.status(400).json("email id not found");
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  loginUser,
};
