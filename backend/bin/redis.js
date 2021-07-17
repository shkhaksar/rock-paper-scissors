const Redis = require("ioredis");
const config = require('../config.js');

module.exports = redis = {};

initialize();

function initialize() {
    redis.client = new Redis(config.redis.port, config.redis.host); // uses defaults unless given configuration object
    redis.client.flushdb() //flush db to make sure no cache is present
    redis.getClient = function () {
        return redis.client
    }
}