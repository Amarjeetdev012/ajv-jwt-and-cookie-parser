const userModel = require("../models/mongoModel")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {
    try {
        let data = req.body
        let saveData = await userModel.create(data)
        return res.status(201).send({ status: true, message: "user register succesfully", data: saveData })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

const loginUser = async (req, res) => {
    try {
        let data = req.body
        let user = await userModel.findOne({ email: data.email }).select({ _id: 1 })
        const token = jwt.sign({ _id: user }, "secret", { expiresIn: '12h' });
        data.token = token

        // syntax res.cookie("name", value, {options}) 

        res.cookie("token", token,{
            maxAge:9600
        })
        // console.log(req.cookies.token)
        res.status(200).send({ status: true, message: "user login succesfully", data: data })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


const getUserData = async (req, res) => {
    try {

        let token = req.cookies.token
        console.log(token)
        if(!token){
            return res.status(400).send({status:false,message:"please provide token or token has expired or login again"})
        }
            let decoded = jwt.verify(token, "secret")
            let findUser = await userModel.findOne({ _id: decoded._id._id })
            let filterData = {}
            filterData.name = findUser.name
            filterData.country = findUser.country
            filterData._id = findUser._id
            return res.status(200).send({ status: true, message: "user data get succesfully", data: filterData })

    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.registerUser = registerUser
module.exports.loginUser = loginUser
module.exports.getUserData = getUserData