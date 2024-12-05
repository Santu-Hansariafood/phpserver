require("dotenv").config();
const cluster = require("cluster");
const os = require("os");

if (cluster.isMaster) {
  console.log(`Master process ${process.pid} is running`);
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Starting a new one...`);
    cluster.fork();
  });
} else {
  const express = require("express");
  const cors = require("cors");
  const helmet = require("helmet");
  const compression = require("compression");
  const { connectDB } = require("./config/db");
  const rateLimit = require("express-rate-limit");

  const app = express();
  const PORT = process.env.PORT || 5000;

  // Connect to the database
  connectDB();

  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use(compression());
  app.use(helmet());

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

  // Set Cache-Control headers globally for all responses (cache for 1 hour)
  app.use((req, res, next) => {
    res.set("Cache-Control", "public, max-age=300");
    next();
  });

  // Lazy-loaded routes
  app.use("/api/groups", async (req, res, next) => {
    const groupRoutes = await import("./routes/groupOfCompanyRoutes");
    groupRoutes.default(req, res, next);
  });

  app.use("/api/buyers", async (req, res, next) => {
    const buyerRoutes = await import("./routes/buyerRoutes");
    buyerRoutes.default(req, res, next);
  });

  app.use("/api/commodities", async (req, res, next) => {
    const commodityRoutes = await import("./routes/commodityRoutes");
    commodityRoutes.default(req, res, next);
  });

  app.use("/api/quality-parameters", async (req, res, next) => {
    const qualityParameterRoutes = await import(
      "./routes/qualityParameterRoutes"
    );
    qualityParameterRoutes.default(req, res, next);
  });

  app.use("/api/consignees", async (req, res, next) => {
    const consigneeRoutes = await import("./routes/consigneeRoutes");
    consigneeRoutes.default(req, res, next);
  });

  app.use("/api/companies", async (req, res, next) => {
    const companyRoutes = await import("./routes/companyRoutes");
    companyRoutes.default(req, res, next);
  });

  app.use("/api/sellers", async (req, res, next) => {
    const sellerRoutes = await import("./routes/sellerRoutes");
    sellerRoutes.default(req, res, next);
  });

  app.use("/api/seller-company", async (req, res, next) => {
    const sellerCompanyRoutes = await import("./routes/sellerCompanyRoutes");
    sellerCompanyRoutes.default(req, res, next);
  });

  // Lazy-load error handler middleware
  app.use(async (err, req, res, next) => {
    const errorHandler = await import("./middlewares/errorHandler.js");
    errorHandler.default(err, req, res, next);
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} running on port ${PORT}`);
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
}
