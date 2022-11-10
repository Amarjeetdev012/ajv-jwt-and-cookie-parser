const express =require("express")
const UserController = require("../Controllers/userController")
const userRegisterSchema = require("../models/ajvRegisterModel")
const userLoginSchema = require("../models/ajvLoginModel")
const validateSchema = require("../middlewares/ajvValidation")

const router = express.Router()

router.post("/register", validateSchema(userRegisterSchema), UserController.registerUser)
router.post("/login", validateSchema(userLoginSchema),   UserController.loginUser)
router.post("/profile",  UserController.getUserData)


module.exports = router