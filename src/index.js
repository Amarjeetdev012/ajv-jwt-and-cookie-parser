const express = require("express")
const mongoose = require("mongoose")
const route = require("./routes/route")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())


mongoose.connect("mongodb+srv://amarjeet:MQqHpWacC0m27LDq@cluster0.xjw7jf8.mongodb.net/test", {
    useNewUrlParser: true
})
    .then(() => {
        console.log("mongodb is connected succesfully")
    })
    .catch((err) => {
        console.log(err)
    })

app.use("/", route)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`express is running on ${PORT}`)
})