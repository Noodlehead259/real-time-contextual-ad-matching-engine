const redis = require("redis")

const client = redis.createClient({
    url: "redis://localhost:6379"
})

client.on("error", (err) => {
    console.log("redis error", err)
})

async function connectRedis() {
    if (!client.isOpen) {
        await client.connect()
        console.log("redis connected")
    }
}

async function setvalue(key, value) {
    await connectRedis()
    await client.set(key, value)
}

async function getvalue(key) {
    await connectRedis()
    return await client.get(key)
}

module.exports = {
    client,
    connectredis : connectRedis,
    setvalue,
    getvalue
}