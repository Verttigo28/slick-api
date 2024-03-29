const {createClient} = require("redis");

const client = createClient({url: "redis://127.0.0.1:6379"})
        .on('error', err => console.log('Redis : Client Error', err))
        .on('ready', () => console.log('Redis : Client ready'))
client.connect()
module.exports = client
