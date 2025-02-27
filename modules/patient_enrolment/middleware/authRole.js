//adapted from auth.js in services/gateway/middleware/auth.js
const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
        return res.status(403).send({ message: "Token not provided, add  in the headers as <Authorization>: <your token>", success: false});
    }

    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized, token invalid or expired", success: false});
      }
      
      req.user = decoded;
      req.id = decoded.id;
      
      console.log(`authRole.js: user id = ${req.id}`);
      next();
    });
} catch (error) {
    console.log(error);
    return res.status(500).send({ message: "An Internal server error occurred", success: false});
  }
}
module.exports = checkAuth;