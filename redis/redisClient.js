const {createClient} = require("redis");

exports.client = await createClient({
    host: process.env.redis_host,
    port: process.env.redis_port,
    password: process.env.redis_password,
    })
    .on('error', err => console.log('Redis : Client Error', err))
    .on('ready', () => console.log('Redis : Client ready'))
    .connect();

exports.publisher = this.client.duplicate();
