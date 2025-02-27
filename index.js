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
  const SERVER_URL = process.env.SERVER_URL || "https://phpserver-v77g.onrender.com";

  // Connect to the database
  connectDB();

  // Middleware
  app.use(express.json());
  app.use(cors());
  app.use(compression());
  app.use(helmet());
  const axios = require("axios");

  app.set("trust proxy", 1);

  const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
  app.use(limiter);

  app.use((req, res, next) => {
    res.set("Cache-Control", "public, max-age=3600");
    next();
  });

  app.get("/api/keep-alive", (req, res) => {
    res.send("Server is awake");
  });

  // Self-Pinging Mechanism to Keep Backend Active
  setInterval(() => {
    axios.get(`${SERVER_URL}/api/keep-alive`)
      .then(() => console.log("Keep-alive ping successful"))
      .catch((err) => console.error("Keep-alive ping failed", err.message));
  }, 4 * 60 * 1000);

  //added ended

  // Lazy-loaded routes
  app.use("/api/groups", (req, res, next) => {
    require("./routes/groupOfCompanyRoutes")(req, res, next);
  });

  app.use("/api/admin", (req, res, next) => {
    require("./routes/adminRoutes")(req, res, next);
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

  app.use("/api/participatebids", (req,res,next) => {
    require("./routes/participationRoutes")(req, res, next);
  });

  app.use("/api/confirm-bid", (req, res, next) => {
    require("./routes/confirmBidRoutes")(req, res, next);
  });

  app.use("/api/loading-entries", (req, res, next) =>{
    require("./routes/loadingEntryRoutes")(req,res,next);
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
