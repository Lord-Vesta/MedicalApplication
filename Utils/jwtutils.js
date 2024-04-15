// const jwt = require("jsonwebtoken");
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const secretKey = process.env.secretKey

export const generateJwt = (result) => {
  const payload = {
    ID: result.Id,
    email: result.Email,
    passwords: result.Password,
    roles: result.roles,
  };
  const options = { expiresIn: "1h" };

  return jsonwebtoken.sign(payload, secretKey, options);
};

export const verifyToken = (token) => {
  try {
    const decoded = jsonwebtoken.verify(token, secretKey);
    return { success: true, data: decoded };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};


// module.exports = {
//   generateJwt,
//   verifyToken,
// };
