function normalize(value, min, max) {
    if (max === min) {
        return 0
    }

    return (value - min) / (max - min)
}

async function rankAds(scoredAds, weights = {
    relevance: 0.6,
    bid: 0.25,
    ctr: 0.15
}, limit = scoredAds.length) {
    const bids = scoredAds.map(ad => ad.bidPrice)
    const ctrs = scoredAds.map(ad => ad.historicalCtr)

    const minBid = Math.min(...bids)
    const maxBid = Math.max(...bids)

    const minCtr = Math.min(...ctrs)
    const maxCtr = Math.max(...ctrs)

    const rankedAds = scoredAds.map(ad => {
        const normalizedBid = normalize(ad.bidPrice, minBid, maxBid)
        const normalizedCtr = normalize(ad.historicalCtr, minCtr, maxCtr)

        const finalScore =
            weights.relevance * ad.relevanceScore +
            weights.bid * normalizedBid +
            weights.ctr * normalizedCtr

        return {
            ...ad,
            normalizedBid,
            normalizedCtr,
            finalScore
        }
    })

    const result = rankedAds.sort((a, b) => b.finalScore - a.finalScore).slice(0, limit)

    return result
}

module.exports = {
    rankads : rankAds 
}