import { createSlice } from '@reduxjs/toolkit';

interface userType {
    userId: number;
    id: string;
    name: string;
    password: string;
    accessToken: string;
    refreshToken: string;
    auth: string;
}
const initialState: userType = {
    userId: 0,
    id: '',
    name: '',
    password: '',
    accessToken: '',
    refreshToken: '',
    auth: '',
} as userType;

export const auth = createSlice({
    name: 'user',
    initialState,
    reducers: {
        reset: () => initialState,
        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setRefreshToken: (state, action) => {
            state.refreshToken = action.payload;
        },
        setId: (state, action) => {
            state.id = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAuth: (state, action) => {
            state.auth = action.payload;
        }
    },
});
export const {
    reset,
    setAccessToken,
    setRefreshToken,
    setId,
    setName,
    setAuth,
} = auth.actions;
export default auth.reducer;