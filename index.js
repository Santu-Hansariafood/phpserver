require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const { connectDB } = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());
app.use(compression());
app.use(helmet());

// Set Cache-Control headers globally for all responses (cache for 1 hour)
app.use((req, res, next) => {
  res.set("Cache-Control", "public, max-age=3600");
  next();
});

// Lazy-loaded routes

app.use("/api/groups", (req, res, next) => {
  require("./routes/groupOfCompanyRoutes")(req, res, next);
});

app.use("/api/buyers", (req, res, next) => {
  require("./routes/buyerRoutes")(req, res, next);
});

app.use("/api/commodities", (req, res, next) => {
  require("./routes/commodityRoutes")(req, res, next);
});

app.use("/api/quality-parameters", (req, res, next) => {
  require("./routes/qualityParameterRoutes")(req, res, next);
});

app.use("/api/consignees", (req, res, next) => {
  require("./routes/consigneeRoutes")(req, res, next);
});

app.use("/api/companies", (req, res, next) => {
  require("./routes/companyRoutes")(req, res, next);
});

// Lazy-load error handler middleware
app.use(async (err, req, res, next) => {
  const errorHandler = await import("./middlewares/errorHandler.js");
  errorHandler.default(err, req, res, next);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.message);
  process.exit(1);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err.message);
  process.exit(1);
});
