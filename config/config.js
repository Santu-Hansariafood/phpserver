require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
  dbURI: process.env.DATABASE_URI || "mongodb://localhost:27017/mydatabase",
};
