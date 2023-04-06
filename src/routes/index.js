const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const authRouter = require("./auth.route");
const productRouter = require("./product.route");

masterRouter.use("/", welcomeRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/product", productRouter);

module.exports = masterRouter;
