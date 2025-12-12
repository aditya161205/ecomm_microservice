const redis = require('redis');

let client;

const connectRedis = async () => {

    const host = process.env.REDIS_HOST || 'localhost';

    client = redis.createClient({
        url: `redis://${host}:6379`
    });

    client.on('error', (err) => console.error('Redis Client Error', err));


    await client.connect();
    console.log('Redis Connected');
    return client;
};

module.exports = { connectRedis, getClient: () => client };