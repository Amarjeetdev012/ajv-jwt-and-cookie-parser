function validateSchema(ajv){
return (req,res,next) => {
    const valid = ajv(req.body)
    if(!valid){
        const errors = ajv.errors

       res.status(400).send(errors)
    }
    next()
}
}

module.exports = validateSchema