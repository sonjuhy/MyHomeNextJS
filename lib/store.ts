import counterReducer from './features/cloud/cloudSlice';
import pageChangeReducer from './features/pageType/pageSlice';
import cloudPathReducer from './features/cloud/cloudSlice';
import authReducer from './features/auth/authSlice';

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
//   whitelist: [""],
};

const rootReducer = combineReducers({
    page: pageChangeReducer,
    cloud: cloudPathReducer,
    counter: counterReducer,
    auth: authReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production", // 개발자도구 확인
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
export const persistor = persistStore(store);