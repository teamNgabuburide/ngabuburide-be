const {Router} = require('express')

const authContoller = require("../controllers/auth.controller");

const authRouter = Router();

// login
// authRouter.post('/', authContoller.login);
authRouter.post("/register", authContoller.register);

module.exports = authRouter