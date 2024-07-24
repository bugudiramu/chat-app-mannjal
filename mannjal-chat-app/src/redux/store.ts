import { configureStore } from "@reduxjs/toolkit";
import messageReducer from "./messageSlice";
import connectionReducer from "./connectionSlice";

export const store = configureStore({
  reducer: {
    messages: messageReducer,
    connection: connectionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
