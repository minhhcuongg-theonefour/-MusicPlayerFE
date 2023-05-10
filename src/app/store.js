import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { music } from "../services/musicBaseApis";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import songSlice from "../features/songSlice";
import authSlice from "../features/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  [music.reducerPath]: music.reducer,
  song: songSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(music.middleware),
  devTools: true,
});

export let persistor = persistStore(store);

setupListeners(store.dispatch);
