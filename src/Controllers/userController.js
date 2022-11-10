const userModel = require("../models/mongoModel")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        let data = req.body
        let saveData = await userModel.create(data)
       return res.status(201).send({ status: true, message: "user register succesfully", data:saveData })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

const loginUser = async (req, res) => {
    try {
        let data = req.body  
   let user = await userModel.findOne({email:data.email}).select({_id:1})
   const token =  jwt.sign({_id:user }, "secret", { expiresIn: '1h' });
   data.token = token
        res.status(200).send({ status: true, message: "user login succesfully", data: data })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const getUserData = async (req, res) => {
    try {
        let token = req.body.token
      let decoded = jwt.verify(token, "secret")
      let findUser = await userModel.findOne({_id:decoded._id})
      console.log(findUser);

        // let userData = userModel.findById( )
       return res.status(200).send({ status: true, message: "user data get succesfully", data:findUser })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

module.exports.registerUser = registerUser
module.exports.loginUser = loginUser
module.exports.getUserData = getUserData