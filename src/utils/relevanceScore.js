const {getads} = require("./mockData.js")
const {getembedding} = require("../services/embeddingService.js")
const {cosinesimilarity} = require("./cosineSimilarity.js")

const ads = getads()

async function embed(data) {
    return await getembedding(data)
}

async function addRelevance(pagecontent){
    const ad_texts = {}
    const page_texts = {
        p1 : pagecontent
    }

    for(let i = 0; i < ads.length; i++){
        ad_texts[ads[i].id] = ads[i].copy
    }

    const embedded_pages = await embed(page_texts)
    const embedded_ads = await embed(ad_texts)

    for(let i = 0; i < ads.length; i++){
        ads[i].relevanceScore = cosinesimilarity(
            embedded_pages.p1,
            embedded_ads[ads[i].id]
        )
    }

    return ads
}

module.exports = {
    relevanceads: addRelevance
}