const express =require("express")
const UserController = require("../Controllers/userController")
const userSchema = require("../models/ajvModel")
const validateSchema = require("../middlewares/auth")

const router = express.Router()

router.post("/register", validateSchema(userSchema), UserController.registerUser)
router.post("/login", UserController.loginUser)

module.exports = router