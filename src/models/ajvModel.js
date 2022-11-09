const ajv  = require("./ajv")

const schema = {
    type: "object",
    properties: {
      name: {type: "string"},
      email: {type: "string"},
      password:{type:"string"},
      country:{enum:["india","us","russia","mangolia","nepal"]}
    },
    required: ["name","email","password","country"],
    additionalProperties: false
  }
  
module.exports = ajv.compile(schema)