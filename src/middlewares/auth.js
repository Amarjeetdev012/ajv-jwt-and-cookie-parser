function validateSchema(ajv) {
    return (req, res, next) => {
        const valid = ajv(req.body)
        if (!valid) {
            const errorMessage = (ajv.errors || []).map((error) => {
                if (error.keyword == "enum") {
                    return `${error.message} ${(ajv.errors[0].params.allowedValues)}`
                }
                return `${error.message}`
            })
           
            // console.log(ajv.errors[0].params.allowedValues)
            return res.status(400).send(errorMessage)
        }
        next()
    }
}

module.exports = validateSchema