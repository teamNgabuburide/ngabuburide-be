const express = require("express");
const route = express.Router();

const productController = require("../controllers/product.controller");
const uploadImageProduct = require("../middleware/multer-cloudinary");

route.post(
  "/add",
  uploadImageProduct.uploadImage,
  productController.addProduct
);

module.exports = route;
