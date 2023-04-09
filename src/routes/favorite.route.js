const { Router } = require("express");
const favoriteRouter = Router();
const {checkToken} = require("../middleware/auth");
const favoriteController = require("../controllers/favorite.controller")


favoriteRouter.get('/', checkToken, favoriteController.getFavorite)
favoriteRouter.post(
  "/",
  checkToken,
  favoriteController.insertFavorite
);

favoriteRouter.delete(
  "/:id",
  checkToken,
  favoriteController.deleteFavorite
);
module.exports = favoriteRouter