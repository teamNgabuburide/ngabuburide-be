const express = require("express");
const route = express.Router();

const productController = require("../controllers/product.controller");
const uploadImageProduct = require("../middleware/multer-cloudinary");

route.get("/categories", productController.getAllCategories);
route.get("/all", productController.getAllProduct);
route.post(
  "/add",
  uploadImageProduct.uploadImage,
  productController.addProduct
);
route.get("/:id", productController.getProductById);
route.patch(
  "/edit/:id",
  uploadImageProduct.uploadImage,
  productController.editProduct
);

module.exports = route;
