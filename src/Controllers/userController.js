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
   const token =  jwt.sign({_id:user }, "secret", { expiresIn: '12h' });
   data.token = token
        res.status(200).send({ status: true, message: "user login succesfully", data: data })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const getUserData = async (req, res) => {
    try {
    
    let bearerToken = req.headers['authorization']
      if(bearerToken !== undefined){
        const bearer = bearerToken.split(' ')
        const token = bearer[1]
        let decoded = jwt.verify(token, "secret")
        let findUser = await userModel.findOne({_id:decoded._id._id})
        let filterData = {}
       filterData.name = findUser.name
       filterData.country = findUser.country
       filterData._id = findUser._id
       
        console.log(filterData)
         return res.status(200).send({ status: true, message: "user data get succesfully", data:filterData})
      }
      else{
        res.status(403).send({message:"please provide valid token"})
      }
     
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.registerUser = registerUser
module.exports.loginUser = loginUser
module.exports.getUserData = getUserData