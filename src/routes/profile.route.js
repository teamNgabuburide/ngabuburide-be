const { Router } = require("express");
const profileRouter = Router();
const profileController = require("../controllers/profile.controller");
const { checkToken } = require("../middleware/auth");
const memoryUpload = require("../middleware/memoryUpload");

profileRouter.get("/", checkToken, profileController.getProfile);
profileRouter.patch("/", checkToken, memoryUpload.single("image"), profileController.updateProfile);

module.exports = profileRouter;
