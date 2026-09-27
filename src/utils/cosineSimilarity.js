function cosinesimilarity(veca, vecb) {
    let dot = 0
    let maga = 0, magb = 0


    for(let i = 0; i < veca.length; i++){
        dot += veca[i] * vecb[i]

        maga += veca[i] * veca[i]
        magb += vecb[i] * vecb[i]
    }

    maga = Math.sqrt(maga)
    magb = Math.sqrt(magb)

    return dot / (maga * magb)
}

module.exports = { cosinesimilarity }