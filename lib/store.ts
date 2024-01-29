import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import storage from 'redux-persist/lib/storage'; // localStorage 에 저장. sessionStorage에 저장하고 싶으면 'redux-persist/lib/storage/session' 참조

import counterReducer from './features/cloud/cloudSlice';
import pageChangeReducer from './features/pageType/pageSlice';
import cloudPathReducer from './features/cloud/cloudSlice';
import authReducer from './features/auth/authSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const rootReducer = combineReducers({
    page: pageChangeReducer,
    cloud: cloudPathReducer,
    counter: counterReducer,
    auth: authReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ // 직렬화 위해
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
    });
}

export const store = makeStore();
export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const wrapper = createWrapper<AppStore>(makeStore, {
    debug: process.env.NODE_ENV === 'development'
});

// without redux-persistence
// export const makeStore = () => {
//     return configureStore({
//       reducer: {
//           counterReducer,
//           pageChangeReducer,
//       }
//     })
// }

// const store = makeStore();