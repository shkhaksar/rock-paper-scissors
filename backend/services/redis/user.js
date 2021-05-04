const {redisKeys} = require("../../constants");
const redis = require('../../bin/redis').getClient();

module.exports = {
    getAll,
    get,
    set,
    delete: _delete
};

async function getAll() {
    const onlineUsers = await redis.hgetall(redisKeys.ONLINE_USERS);
    return Object.values(onlineUsers).map(u => JSON.parse(u))
}

async function get(id) {
    let user = await redis.hget(redisKeys.ONLINE_USERS, id);
    return JSON.parse(user)
}

async function set(user) {
    await redis.hset(redisKeys.ONLINE_USERS, user.id, JSON.stringify(user));
}

async function _delete(id) {
    await redis.hdel(redisKeys.ONLINE_USERS, id)
}