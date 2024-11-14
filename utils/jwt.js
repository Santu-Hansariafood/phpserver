const jwt = require("jsonwebtoken");
const config = require("../config");

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, config.jwtSecret, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (err) {
    throw new Error("Invalid Token");
  }
};

module.exports = { generateToken, verifyToken };
