import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {ConnectionStatus} from "@/constants/socket";
import socket from '@/utils/socket'
import {States} from "@/constants/game";

export const setupSocket = createAsyncThunk(
    'socket/connect',
    async (action, thunkAPI) => {
        const {user} = thunkAPI.getState().user
        thunkAPI.dispatch(setConnection(ConnectionStatus.CONNECTING))

        // Make sure socket is fresh
        socket.off()
        socket.close()


        //Register listeners
        socket.on('connect', () => {
            socket.emit('online', user);
        })

        socket.on('disconnect', () => {
            thunkAPI.dispatch(setGame(null))
            thunkAPI.dispatch(setMatchmaking(false))
        })

        socket.on('online', (onlineUsers) => {
            thunkAPI.dispatch(setOnlineUsers(onlineUsers))
            thunkAPI.dispatch(setConnection(ConnectionStatus.CONNECTED))
        })

        socket.on('leaderboard', (leaderboard) => {
            thunkAPI.dispatch(setLeaderboard(leaderboard))
        })

        socket.on('game', (game) => {
            if (game.state === States.PREPARING) {
                thunkAPI.dispatch(setGameActionTaken(false))
                thunkAPI.dispatch(setReady(false))
            } else if (game.state === States.GAME_RESULT) {
                thunkAPI.dispatch(setMatchmaking(false))
            }
            thunkAPI.dispatch(setGame(game))
        })

        socket.open()
    }
)

export const closeSocket = createAsyncThunk(
    'socket/close',
    async (action, thunkAPI) => {
        socket.off() //remove listeners
        socket.close()
        thunkAPI.dispatch(reset())
    }
)

export const matchmaking = createAsyncThunk(
    'socket/matchmaking',
    async (action, thunkAPI) => {
        thunkAPI.dispatch(setMatchmaking(true))
        const {user} = thunkAPI.getState().user
        socket.emit('match_making', user)
    }
)

export const gameReady = createAsyncThunk(
    'socket/gameReady',
    async (action, thunkAPI) => {
        const {user} = thunkAPI.getState().user
        const {game, ready} = thunkAPI.getState().socket
        if (ready === false)
            socket.emit('game_ready', user, game.id)
    }
)

export const gameAction = createAsyncThunk(
    'socket/gameAction',
    async (action, thunkAPI) => {
        const {user} = thunkAPI.getState().user
        const {game, gameActionTaken} = thunkAPI.getState().socket
        if (gameActionTaken === false) {
            thunkAPI.dispatch(setGameActionTaken(true))
            socket.emit('game_action', user, action, game.id)
        }
    }
)


const initialState = {
    connection: ConnectionStatus.DISCONNECTED,
    matchmaking: false,
    onlineUsers: [],
    leaderboard: [],
    game: null,
    gameActionTaken: false,
    ready: false
}

const socketSlice = createSlice({
    name: 'socket',
    initialState: initialState,
    reducers: {
        reset: (state, action) => {
            return initialState
        },
        setConnection(state, action) {
            state.connection = action.payload
        },
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload
        },
        setLeaderboard(state, action) {
            state.leaderboard = action.payload
        },
        setMatchmaking(state, action) {
            state.matchmaking = action.payload
        },
        setGame(state, action) {
            state.game = action.payload
        },
        setGameActionTaken(state, action) {
            state.gameActionTaken = action.payload
        },
        setReady(state, action) {
            state.ready = action.payload
        }
    }
})

export const {reset, setConnection, setOnlineUsers, setMatchmaking, setGame, setGameActionTaken, setReady, setLeaderboard} = socketSlice.actions

export default socketSlice.reducer