import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from "./slice/SnackBarSlice";
import customerRequestReducer from "./slice/CustomerRequestSlice";

export const store = configureStore({
  reducer: {
    snackBar: snackBarReducer,
    customerRequest: customerRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
