const gameService = require('../services/redis/game');
const userService = require('../services/redis/user');
const userServiceDB = require('../services/sql/user');
const {playerStates, gameStates, gameActions} = require("../constants");

module.exports = function (app) {
    const io = app.get('io')

    io.on('connection', (socket) => {
        //Here we register event handlers
        socket.on('disconnect', onDisconnect);
        socket.on('online', onOnline);
        socket.on('match_making', onMatchmaking);
        socket.on('game_ready', onGameReady);
        socket.on('game_action', onGameAction);


        //notify clients when a user disconnects
        async function onDisconnect() {
            const onlineUsers = await userService.getAll()
            const disconnectedUser = onlineUsers.find(u => u.socketID === socket.id)
            if (disconnectedUser) { //Remove user from online players list
                //finish game if user state is PLAYING
                if (disconnectedUser.state === playerStates.PLAYING)
                    await _finishGame(disconnectedUser.gameId, disconnectedUser)
                userService.delete(disconnectedUser.id).then(_dispatchOnline).then(_dispatchLeaderboard)
            }
        }

        //notify clients when a user come online
        async function onOnline(user) {
            user.state = playerStates.IDLE
            user.socketID = socket.id
            userService.set(user).then(_dispatchOnline).then(_dispatchLeaderboard)
        }

        //register a user in matchmaking lists, and create a game if another player is available
        async function onMatchmaking(user) {
            user.socketID = socket.id
            user.state = playerStates.MATCH_MAKING

            //save the new user state
            await userService.set(user).then(_dispatchOnline)

            //search for available players
            const onlineUsers = await userService.getAll()
            const opponent = onlineUsers.find(u => u.state === playerStates.MATCH_MAKING && u.id !== user.id)
            if (opponent) await _createGame(user, opponent)
        }

        async function onGameReady(user, gameId) {
            const game = await gameService.get(gameId)
            game[user.id].ready = true
            //check if both users are ready
            if (game[game.players[0]].ready && game[game.players[1]].ready) {
                game[game.players[0]].action = null
                game[game.players[1]].action = null
                game.state = gameStates.PLAYING
            }
            await gameService.set(game) //save actions
            io.to(game.id).emit('game', game)
        }

        async function onGameAction(user, action, gameId) {
            const game = await gameService.get(gameId)
            game[user.id].action = action
            await gameService.set(game) //save action

            //process round result
            let p1 = game[game.players[0]]
            let p2 = game[game.players[1]]

            //only process rounds if only two players have actions
            if (p1.action && p2.action) {

                //rock-paper-scissors scoring logic
                if (p1.action !== p2.action) {
                    switch (p1.action) {
                        case gameActions.ROCK:
                            p2.action === gameActions.PAPER ? p2.score++ : p1.score++
                            p2.action === gameActions.PAPER ? game.winner = p2.id : game.winner = p1.id
                            break
                        case gameActions.PAPER:
                            p2.action === gameActions.SCISSORS ? p2.score++ : p1.score++
                            p2.action === gameActions.SCISSORS ? game.winner = p2.id : game.winner = p1.id
                            break
                        case gameActions.SCISSORS:
                            p2.action === gameActions.ROCK ? p2.score++ : p1.score++
                            p2.action === gameActions.ROCK ? game.winner = p2.id : game.winner = p1.id
                            break
                    }
                }

                //Evaluate Game outcome and update its state
                if (p1.score === 3 || p2.score === 3) { //Someone has won the game - So we finish it
                    game.state = gameStates.GAME_RESULT
                    game.winner = p1.score === 3 ? p1.id : p2.id
                    game.loser = p1.score === 3 ? p2.id : p1.id
                    game[p1.id] = p1
                    game[p2.id] = p2
                    io.to(game.id).emit('game', game)

                    //Remove players from game room
                    p1 = await userService.get(game.players[0])
                    p2 = await userService.get(game.players[1])
                    io.sockets.sockets.get(p1.socketID).leave(game.id)
                    io.sockets.sockets.get(p2.socketID).leave(game.id)

                    //Make player states IDLE again
                    p1.state = playerStates.IDLE
                    p2.state = playerStates.IDLE

                    //update scores for online players list
                    if (p1.id === game.winner) {
                        p1.wins++
                        p2.losses++
                    } else {
                        p2.wins++
                        p1.losses++
                    }

                    await userService.set(p1)
                    await userService.set(p2)
                    await _dispatchOnline()

                    //update Leaderboard data
                    await userServiceDB.win(game.winner)
                    await userServiceDB.loss(game.loser)
                    await _dispatchLeaderboard()

                    await gameService.delete(game.id)
                } else {
                    //Go back for another round!
                    game.state = gameStates.PREPARING
                    p1.ready = false
                    p2.ready = false
                    game[p1.id] = p1
                    game[p2.id] = p2
                    await gameService.set(game)
                    io.to(game.id).emit('game', game)
                }
            }
        }

        //create a game with two players
        async function _createGame(player, opponent) {
            const game = await gameService.create(player, opponent) //create a game

            player.state = playerStates.PLAYING
            opponent.state = playerStates.PLAYING
            player.gameId = game.id
            opponent.gameId = game.id
            await userService.set(player) //save player with the new state
            await userService.set(opponent) //save opponent with the new state
            await _dispatchOnline()

            // add users to the game room then send game data for both
            io.sockets.sockets.get(player.socketID).join(game.id)
            io.sockets.sockets.get(opponent.socketID).join(game.id)
            io.to(game.id).emit('game', game)
        }

        //send online users list to all clients
        async function _dispatchOnline() {
            const onlineUsers = await userService.getAll()
            io.emit('online', onlineUsers)
        }

        async function _dispatchLeaderboard() {
            const leaderboard = await userServiceDB.getAllForLeaderboard()
            io.emit('leaderboard', leaderboard)
        }

        //Finish game when a user disconnect
        async function _finishGame(gameId, loser) {
            const game = await gameService.get(gameId)
            let winner = game[loser.id].opponent
            game.state = gameStates.GAME_RESULT
            game.winner = winner.id
            game.loser = loser.id
            game[winner.id].score = 3
            io.to(game.id).emit('game', game)

            //Remove winner from game room
            winner = await userService.get(winner.id)
            io.sockets.sockets.get(winner.socketID).leave(game.id)

            //Make player state IDLE again
            winner.state = playerStates.IDLE
            winner.wins++

            await userService.set(winner)
            await _dispatchOnline()

            //update Leaderboard data
            await userServiceDB.win(game.winner)
            await userServiceDB.loss(game.loser)
            await _dispatchLeaderboard()

            await gameService.delete(game.id)
        }
    });
}