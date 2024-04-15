// const { verifyToken } = require("../Utils/jwtutils");
import {verifyToken} from "../Utils/jwtutils.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: "You are not authorized to access this API",
    });
  }

  const result = verifyToken(token);
  if (!result.success) {
    return res.status(403).json({
      status: 403,
      message: "check JWT token",
      error: result.error,
    });
  }

  req.user = result.data;
  next();
}

// module.exports = {
//   authenticateToken,
// };
