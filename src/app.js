const express = require("express")

const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    res.json({status:"ok"})
})

app.use((req, res) => {
    res.status(404).json({
        error: "route not found"
    })
})

module.exports = {
    app
}