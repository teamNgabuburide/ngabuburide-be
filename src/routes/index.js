const express = require("express");
const masterRouter = express.Router();

const authRouter = require("./auth.route");


masterRouter.use('/auth', authRouter)


module.exports = masterRouter;