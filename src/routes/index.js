const express = require("express");
const masterRouter = express.Router();

const welcomeRouter = require("./welcome.route");
const authRouter = require("./auth.route");
const productRouter = require("./product.route");
const profileRouter = require("./profile.route");
const favoriteRouter = require("./favorite.route");
const promo = require("./promo.route");
const transaction = require("./transaction.route");

masterRouter.use("/", welcomeRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/profile", profileRouter);
masterRouter.use("/product", productRouter);
masterRouter.use("/favorite", favoriteRouter);
masterRouter.use("/promo", promo);
masterRouter.use("/transaction", transaction);

module.exports = masterRouter;
