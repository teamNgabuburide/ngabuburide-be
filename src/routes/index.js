const express = require("express");
const masterRouter = express.Router();

const authRouter = require("./auth.route");
const productRouter = require("./product.route");

masterRouter.use("/auth", authRouter);
masterRouter.use("/product", productRouter);

module.exports = masterRouter;
