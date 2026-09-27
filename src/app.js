const express = require("express")
const { relevanceads } = require("./utils/relevanceScore.js")
const { rankads } = require("./services/rankingService.js")

const app = express()

app.use(express.json())

app.get("/health", (req, res) => {
    res.json({status:"ok"})
})

app.post("/match", async (req, res) => {
    const data = req.body

    const scoredads = await relevanceads(data.content)

    const weights = {
        relevance: 0.6,
        bid: 0.25,
        ctr: 0.15
    }

    const limit = 3

    const rankedads = await rankads(scoredads, weights, limit)

    res.json({
        "data" : rankedads
    })
})

app.use((req, res) => {
    res.status(404).json({
        error: "route not found"
    })
})

module.exports = {
    app
}