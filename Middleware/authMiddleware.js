const { verifyToken } = require("../Utils/jwtutils");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;
  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyToken(token);
  console.log(result.success);
  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
}

module.exports = {
  authenticateToken,
};
