import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageCounterState = {
    value: number;
    defaultPublicPath: string;
    defaultPrivatePath: string;
    defaultTrashPublicPath: string;
    defaultTrashPrivatePath: string;
    defaultThumbnailPath: string;
    nowPath: string;
}

const initialState = {
    value: 0,
    defaultPublicPath: '',
    defaultPrivatePath: '',
    defaultTrashPublicPath: '',
    defaultTrashPrivatePath: '',
    defaultThumbnailPath: '',
    nowPath: '',
} as PageCounterState;

export const cloud = createSlice({
    name: 'cloud',
    initialState,
    reducers: {
        reset: () => initialState,
        setNowPathToPublicPath: (state) => {
            state.nowPath = state.defaultPublicPath;
        },
        setNowPathToPrivatePath: (state) => {
            state.nowPath = state.defaultPrivatePath;
        },
        setNowPathToPublicTrashPath: (state) => {
            state.nowPath = state.defaultTrashPublicPath;
        },
        setNowPathToPrivateTrashPath: (state) => {
            state.nowPath = state.defaultTrashPrivatePath;
        },
        setDefaultPublicPath: (state, action: PayloadAction<string>) => {
            state.defaultPublicPath = action.payload;
        },
        setDefaultPrivatePath: (state, action: PayloadAction<string>) => {
            state.defaultPrivatePath = action.payload;
        },
        setDefaultPublicTrashPath: (state, action: PayloadAction<string>) => {
            state.defaultTrashPublicPath = action.payload;
        },
        setDefaultPrivateTrashPath: (state, action: PayloadAction<string>) => {
            state.defaultTrashPrivatePath = action.payload;
        },
        setDefaultThumbnailPath: (state, action: PayloadAction<string>) => {
            state.defaultThumbnailPath = action.payload;
        },
    }
})

export const {
    reset,
    setNowPathToPublicPath,
    setNowPathToPrivatePath,
    setDefaultPublicPath,
    setDefaultPrivatePath,
    setNowPathToPublicTrashPath,
    setNowPathToPrivateTrashPath,
    setDefaultPublicTrashPath,
    setDefaultPrivateTrashPath,
    setDefaultThumbnailPath
} = cloud.actions;
export default cloud.reducer;