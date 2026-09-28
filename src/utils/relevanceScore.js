const {getads} = require("./mockData.js")
const {getembedding} = require("../services/embeddingService.js")
const {cosinesimilarity} = require("./cosineSimilarity.js")
const {getvalue} = require("../services/redisService.js")

const ads = getads()

async function embed(data) {
    return await getembedding(data)
}

async function addRelevance(pagecontent){
    const page_texts = {
        p1 : pagecontent
    }

    const embedded_pages = await embed(page_texts)

    for(let i = 0; i < ads.length; i++){
        const embedvalue = await getvalue(`ad:${ads[i].id}`)

        ads[i].relevanceScore = cosinesimilarity(
            embedded_pages.p1,
            JSON.parse(embedvalue)
        )
    }

    return ads
}

module.exports = {
    relevanceads: addRelevance
}