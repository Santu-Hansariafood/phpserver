require("dotenv").config();
const cluster = require("cluster");
const os = require("os");
const path = require("path");

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
  app.use(compression());
  app.use(helmet());

  // CORS configuration
  const allowedOrigins = [
    "https://hansariafood-shop.vercel.app",
    "http://localhost:5173/login",
  ];

  const corsOptions = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  app.use(cors(corsOptions));

  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);

  // Cache-Control headers
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

  app.use("/api/sellers", (req, res, next) => {
    require("./routes/sellerRoutes")(req, res, next);
  });

  app.use("/api/seller-company", (req, res, next) => {
    require("./routes/sellerCompanyRoutes")(req, res, next);
  });

  app.use("/api/bid-locations", (req, res, next) => {
    require("./routes/bidLocationRoutes")(req, res, next);
  });

  app.use("/api/bids", (req, res, next) => {
    require("./routes/BaseBidRoutes")(req, res, next);
  });

  app.use("/api/agents", (req, res, next) => {
    require("./routes/agentRoutes")(req, res, next);
  });

  app.use("/api/self-order", (req, res, next) => {
    require("./routes/selfOrderRoutes")(req, res, next);
  });

  app.use("/api/sauda-no", (req, res, next) => {
    require("./routes/SaudaNoRoutes")(req, res, next);
  });

  // Serve React build files for unknown routes
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });

  // Lazy-loaded error handler middleware
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
