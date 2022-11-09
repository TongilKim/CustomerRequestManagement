import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from "./slice/SnackBarSlice";

export const store = configureStore({
  reducer: {
    snackBar: snackBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
