import { configureStore } from "@reduxjs/toolkit";
import { music } from "../services/musicBaseApis";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import songSlice from "../features/songSlice";

export const store = configureStore({
  reducer: {
    [music.reducerPath]: music.reducer,
    song: songSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(music.middleware),
});

setupListeners(store.dispatch);
