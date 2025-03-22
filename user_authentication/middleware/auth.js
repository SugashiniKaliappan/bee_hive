import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken = (req, res, next) => {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(403).send({ message: "Token is entered, Please enter/paste your token for Authorization, select Bearer" });
  }
  
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token, this token is expired or invalid signature" });
    }
    req.user = decoded;
    next();
  });
};