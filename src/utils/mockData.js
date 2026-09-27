const pages = [
    {
        id: "p1",
        content: "best budget travel destinations in europe with cheap flights and hotels"
    },
    {
        id: "p2",
        content: "how to choose the best gaming laptop for competitive gaming"
    },
    {
        id: "p3",
        content: "how to invest money and build a long term investment portfolio"
    },
    {
        id: "p4",
        content: "latest fashion trends and affordable clothing for summer"
    }
]

const ads = [
    {
        id: "a1",
        copy: "affordable european vacation packages and cheap hotels",
        bidPrice: 2.5,
        historicalCtr: 0.03
    },
    {
        id: "a2",
        copy: "buy the latest gaming laptops with powerful graphics cards",
        bidPrice: 4.5,
        historicalCtr: 0.05
    },
    {
        id: "a3",
        copy: "compare cheap flights and find the best travel deals",
        bidPrice: 3.2,
        historicalCtr: 0.04
    },
    {
        id: "a4",
        copy: "investing platform with stocks and long term investment tools",
        bidPrice: 5.0,
        historicalCtr: 0.06
    },
    {
        id: "a5",
        copy: "shop the latest summer fashion at affordable prices",
        bidPrice: 2.8,
        historicalCtr: 0.035
    }
]

function getPages() {
    return pages
}

function getAds() {
    return ads
}

module.exports = {
    getpages : getPages,
    getads : getAds
}