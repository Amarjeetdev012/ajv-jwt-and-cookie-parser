function validateSchema(ajv) {
    return (req, res, next) => {
        const valid = ajv(req.body)
        if (!valid) {
            const errorMessage = (ajv.errors || []).map((error) => {
                if(error.keyword == "enum"){
error.message.values  = ["india","us","russia","mangolia","nepal"]
return error.message
                }
                return `${error.keyword}`
            })
            // const errormessage = ajv.errors
        console.log((ajv.errors).forEach(function (key) {
            console.log(key.message)
        }))

           return res.status(400).send(errorMessage)
        }
next()
    }
}

module.exports = validateSchema