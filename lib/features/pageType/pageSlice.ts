import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageTypeState = {
    value: string;
}

const initialState = {
    value: 'home',
} as PageTypeState;

export const pageChanger = createSlice({
    name: 'pageType',
    initialState,
    reducers: {
        reset: () => initialState,
        changePage: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    }
})

export const {
    changePage,
    reset,
} = pageChanger.actions;
export default pageChanger.reducer;