const express = require("express");
const route = express.Router();

const productController = require("../controllers/product.controller");
const uploadImageProduct = require("../middleware/multer-cloudinary");

route.get("/categories", productController.getAllCategories);
route.get("/all", productController.getAllProduct);
route.get("/categories/count", productController.getCountCategory);
route.post(
  "/add",
  uploadImageProduct.uploadImage,
  productController.addProduct
);
route.get("/:id", productController.getProductById);
route.patch(
  "/edit-images/:id",
  uploadImageProduct.uploadImage,
  productController.editImages
);
route.patch("/edit/:id", productController.updateProduct);
route.delete("/delete/:id", productController.deleteProduct);
module.exports = route;
