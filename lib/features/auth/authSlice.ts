import { createSlice } from '@reduxjs/toolkit';
interface userType {
    email: string | null;
}
const initialState: userType = {
    email: null,
};
export const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload;
        },
    },
});
export const user = slice.name;
export const userReducer = slice.reducer;
export const userAction = slice.actions;