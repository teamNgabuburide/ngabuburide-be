const express = require("express");
const route = express.Router();
const transactionController = require("../controllers/transaction.controller");

route.post("/add", transactionController.addTransaction);
route.get("/:id", transactionController.getTransactionByUser);

module.exports = route;
