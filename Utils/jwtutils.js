const jwt = require("jsonwebtoken");
require('dotenv').config();

const secretKey = process.env.secretKey

const generateJwt = (result) => {
  const payload = {
    ID: result.Id,
    email: result.Email,
    passwords: result.Password,
    roles: result.roles,
  };
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return { success: true, data: decoded };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};


module.exports = {
  generateJwt,
  verifyToken,
};

// {
//     status : 201,
//     message : "your message",
//     data : //your data
// }
