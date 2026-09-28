const { getembedding } = require("../src/services/embeddingService")
const { getads } = require("../src/utils/mockData")
const { client, setvalue } = require("../src/services/redisService")


async function main() {
    const ads = getads()

    const addata = {}

    for(let i = 0;i < ads.length;i++){
        addata[ads[i].id] = ads[i].copy
    }

    const embeddedads = await getembedding(addata)

    for(let i = 0;i < ads.length;i++){
        await setvalue(`ad:${ads[i].id}`, JSON.stringify(embeddedads[ads[i].id]))
    }

    await client.quit()
}

main()