async function getEmbeddings(data){
    const response = await fetch("http://127.0.0.1:8000/embed", {
        method : "POST",
        headers : {
            "Content-type":"application/json"
        },
        body : JSON.stringify(data)
    })

    if(!response.ok){
        throw new Error(`embedding service returned ${response.status}`)
    }

    return await response.json()
}

module.exports = {
    getembedding : getEmbeddings
}