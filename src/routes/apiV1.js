const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const paymentRoutes = require("./paymentRoutes");

const apiV1 = express.Router();

apiV1.use("/users", userRoutes);
apiV1.use("/auth", authRoutes);
apiV1.use("/payment", paymentRoutes);

module.exports = apiV1;
