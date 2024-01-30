import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageCounterState = {
    value: number;
    defaultPublicPath: string;
    defaultPrivatePath: string;
    defaultTrashPublicPath: string;
    defaultTrashPrivatePath: string;
    defaultThumbnailPath: string;
    nowPath: string;
    pageCount: number;
}

const initialState = {
    value: 0,
    defaultPublicPath: '',
    defaultPrivatePath: '',
    defaultTrashPublicPath: '',
    defaultTrashPrivatePath: '',
    defaultThumbnailPath: '',
    nowPath: '',
    pageCount: 0,
} as PageCounterState;

export const cloud = createSlice({
    name: 'cloud',
    initialState,
    reducers: {
        reset: () => initialState,
        setNowPathStatic: (state, action: PayloadAction<string>) => {
            state.nowPath = action.payload;
        },
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
        setPageCount: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload;
        },
        incrementPageCount: (state) => {
            console.log("incrementPageCount");
            state.pageCount +=1 ;
        },
        decrementPageCount: (state) =>{
            state.pageCount -= 1;
        }
    }
})

export const {
    reset,
    setNowPathStatic,
    setNowPathToPublicPath,
    setNowPathToPrivatePath,
    setDefaultPublicPath,
    setDefaultPrivatePath,
    setNowPathToPublicTrashPath,
    setNowPathToPrivateTrashPath,
    setDefaultPublicTrashPath,
    setDefaultPrivateTrashPath,
    setDefaultThumbnailPath,
    setPageCount,
    incrementPageCount,
    decrementPageCount,
} = cloud.actions;
export default cloud.reducer;