import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageTypeState = {
  value: string;
  language: boolean;
  size: number; // 0 : default, 1: md, 2 : sm, : 3: xs
};

const initialState = {
  value: "home",
  language: true,
  size: 0,
} as PageTypeState;

export const pageChanger = createSlice({
  name: "pageType",
  initialState,
  reducers: {
    reset: () => initialState,
    changePage: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    changeLanguage: (state, action: PayloadAction<boolean>) => {
      state.language = action.payload;
    },
    changePageSize: (state, action: PayloadAction<number>) => {
      state.size = action.payload;
    },
  },
});

export const { changePage, changeLanguage, changePageSize, reset } =
  pageChanger.actions;
export default pageChanger.reducer;
