const dotenv = require("dotenv")
const {connectredis} = require("./services/redisService.js")
const { app } = require("./app.js")

dotenv.config()

connectredis()

const port = process.env.PORT || 3000

app.listen(port, (req, res) =>{
    console.log(`server running on port ${port}`)
})