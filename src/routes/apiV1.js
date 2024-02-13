const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

// const refreshTokenRoute = require("./refreshTokenRoute");

const apiV1 = express.Router();

apiV1.use("/users", userRoutes);
apiV1.use("/auth", authRoutes);

// apiV1.use("/refresh-token", refreshTokenRoute);
module.exports = apiV1;
