const registerUser = async (req, res) => {
    try {
        let data = req.body
  
       return res.status(201).send({ status: true, message: "user register succesfully" })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })

    }
}

const loginUser = async (req, res) => {
    try {
        let data = req.body
        res.status(200).send({ status: true, message: "user login succesfully", data: data })
    }

    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}


module.exports.registerUser = registerUser
module.exports.loginUser = loginUser