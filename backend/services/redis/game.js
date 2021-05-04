const {gameStates} = require("../../constants");
const {redisKeys} = require("../../constants");
const redis = require('../../bin/redis').getClient();

module.exports = {
    getAll,
    get,
    set,
    create,
    delete: _delete
};

async function getAll() {
    const games = await redis.hgetall(redisKeys.GAMES);
    return Object.values(games).map(g => JSON.parse(g))
}

async function get(id) {
    let game = await redis.hget(redisKeys.GAMES, id);
    return JSON.parse(game)
}

async function get_by_players(id) {
    let game = await redis.hget(redisKeys.GAMES, id);
    return JSON.parse(game)
}

async function set(game) {
    await redis.hset(redisKeys.GAMES, game.id, JSON.stringify(game));
}

async function create(player, opponent) {
    const game = {
        id: `GAME_${player.id}_${opponent.id}`,
        state: gameStates.PREPARING,
        players: [player.id, opponent.id],
        [player.id]: {id: player.id, score: 0, opponent: opponent},
        [opponent.id]: {id: opponent.id, score: 0, opponent: player}
    }
    await set(game) //save the game
    return game
}

async function _delete(id) {
    await redis.hdel(redisKeys.GAMES, id)
}