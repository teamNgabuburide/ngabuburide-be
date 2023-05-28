const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profile.controller");
const { checkToken } = require("../middleware/auth");
const { memoryUpload, errorHandler } = require("../middleware/memoryUpload");

profileRouter.get("/", checkToken, profileController.getProfile);
profileRouter.patch(
  "/",
  checkToken,
  (req, res, next) =>
    memoryUpload.single("image")(req, res, (err) => {
      errorHandler(err, res, next);
    }),
  profileController.updateProfile
);

module.exports = profileRouter;
