import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {getCurrent, login as loginRequest, signup as signupRequest} from "@/services/user";


export const login = createAsyncThunk(
    'user/login',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        const {email, password} = payload
        await loginRequest(email, password)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                return Promise.resolve();
            }).catch(() => {
                return Promise.reject();
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false))
            })
    }
)

export const signup = createAsyncThunk(
    'user/signup',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        const {name, email, password} = payload
        await signupRequest(name, email, password)
            .then((res) => {
                return Promise.resolve();
            }).catch(() => {
                return Promise.reject();
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false))
            })
    }
)

export const current = createAsyncThunk(
    'user/current',
    async (payload, thunkAPI) => {
        thunkAPI.dispatch(setLoading(true))
        await getCurrent()
            .then((res) => {
                thunkAPI.dispatch(setUser(res.data)) //emit token for security reasons
                return Promise.resolve();
            }).catch(() => {
                return Promise.reject();
            })
            .finally(() => {
                thunkAPI.dispatch(setLoading(false))
            })
    }
)

const initialState = {
    loading: false,
    user: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('token')
            return initialState
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setUser(state, action) {
            state.user = action.payload
        }
    }
})

export const {logout, setLoading, setUser} = userSlice.actions

export default userSlice.reducer