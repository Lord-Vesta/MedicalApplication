const jwt = require("jsonwebtoken");

const generateJwt = (result) => {
  const payload = {
    ID: result.Id,
    email: result.Email,
    passwords: result.passwords,
    roles: result.roles,
  };

  const secretKey = "shhhh";
  const options = { expiresIn: "1h" };

  return jwt.sign(payload, secretKey, options);
};

const verifyToken = (token) => {
  const secret = "shhhh";
  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
};


module.exports = {
  generateJwt,
  verifyToken
};
