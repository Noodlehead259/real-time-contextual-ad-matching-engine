const {getads} = require("./mockData.js")
const {getembedding} = require("../services/embeddingService.js")
const {cosinesimilarity} = require("./cosineSimilarity.js")
const {client, getvalue, setvalue} = require("../services/redisService.js")

const ads = getads()

async function embed(data) {
    return await getembedding(data)
}

async function addRelevance(pagecontent){
    const page_texts = {
        p1 : pagecontent
    }

    const embedded_pages = {}

    const exists = await client.exists("page:p1")

    if(exists === 1){
        embedded_pages.p1 = JSON.parse(await getvalue("page:p1"))
    }else{
        const result = await embed(page_texts)

        embedded_pages.p1 = result.p1

        await setvalue("page:p1", JSON.stringify(embedded_pages.p1), 300)
    }
    

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