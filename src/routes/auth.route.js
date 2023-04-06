const {Router} = require('express')

const authContoller = require("../controllers/auth.controller");
const authMiddleware = require('../middleware/auth')
const authRouter = Router();

// login
authRouter.post('/', authContoller.login);
authRouter.post("/register", authContoller.register);
authRouter.get("/private", authMiddleware.checkToken, authContoller.privateAcces);

module.exports = authRouter