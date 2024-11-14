const mongoose = require("mongoose");
require("dotenv").config();

let currentPoolSize = 10;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      maxPoolSize: currentPoolSize,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      compressors: "zlib",
    });

    console.log("MongoDB Connected Successfully");

    mongoose.connection.on("connected", () => {
      console.log("Mongoose connected to DB");
    });

    mongoose.connection.on("disconnected", () => {
      console.log("Mongoose disconnected from DB");
    });

    monitorPoolSize();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const monitorPoolSize = () => {
  setInterval(() => {
    const connectionCount = mongoose.connections.length;

    console.log(`Current connection count: ${connectionCount}`);

    if (connectionCount >= 0.8 * currentPoolSize && currentPoolSize < 100) {
      currentPoolSize += 10;
      console.log(`Increasing pool size to ${currentPoolSize}`);
      reconnectWithNewPoolSize();
    }

    if (connectionCount <= 0.4 * currentPoolSize && currentPoolSize > 10) {
      currentPoolSize -= 10;
      console.log(`Decreasing pool size to ${currentPoolSize}`);
      reconnectWithNewPoolSize();
    }
  }, 60000);
};

const reconnectWithNewPoolSize = async () => {
  try {
    await mongoose.connection.close();
    await mongoose.connect(process.env.DATABASE_URI, {
      maxPoolSize: currentPoolSize,
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      compressors: "zlib",
    });
    console.log("Reconnected with new pool size successfully");
  } catch (error) {
    console.error(`Reconnection Error: ${error.message}`);
  }
};

module.exports = { connectDB };
