import { configureStore } from "@reduxjs/toolkit";
import snackBarReducer from "./slice/SnackBarSlice";
import customerRequestReducer from "./slice/CustomerRequestSlice";
import completedRequestReducer from "./slice/CompletedCustomerRequestSlice";

export const store = configureStore({
  reducer: {
    snackBar: snackBarReducer,
    customerRequest: customerRequestReducer,
    completedCustomerRequest: completedRequestReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
