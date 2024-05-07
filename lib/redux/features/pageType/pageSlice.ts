import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type PageTypeState = {
  value: string;
  language: boolean;
};

const initialState = {
  value: "home",
  language: true,
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
  },
});

export const { changePage, changeLanguage, reset } = pageChanger.actions;
export default pageChanger.reducer;
