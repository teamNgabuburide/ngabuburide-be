const express = require("express");
const route = express.Router();
const promoController = require("../controllers/promo.controller");

route.post("/add", promoController.addPromo);
route.get("/discount", promoController.getPromoByKey);
route.patch("/edit/:id", promoController.editPromo);
route.delete("/delete/:id", promoController.deletePromo);

module.exports = route;
