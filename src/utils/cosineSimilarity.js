function cosinesimilarity(veca, vecb) {
    const dot = veca.reduce((sum, a, i) => sum + a * vecb[i], 0)
    const maga = Math.sqrt(veca.reduce((sum, a) => sum + a * a, 0))
    const magb = Math.sqrt(vecb.reduce((sum, b) => sum + b * b, 0))

    return dot / (maga * magb)
}

module.exports = { cosinesimilarity }