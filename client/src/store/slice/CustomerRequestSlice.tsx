/**
 * WRITTEN DATE: 2022/11/13
 * AUTHOR: TONGIL KIM
 * PURPOSE:  customer request에 대한 state를 관리하는 slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCustomerRequest } from "../../type";

type TinitialState = {
  specificCustomerRequestList: TCustomerRequest[];
  newCustomerRequestList: TCustomerRequest[];
};

const initialState: TinitialState = {
  specificCustomerRequestList: [],
  newCustomerRequestList: [],
};

const snackbarSlice = createSlice({
  name: "customerRequest",
  initialState,
  reducers: {
    setSpecificCustomerRequestList(
      state,
      action: PayloadAction<TCustomerRequest[]>
    ) {
      state.specificCustomerRequestList = action.payload;
    },
    setNewCustomerRequestList(
      state,
      action: PayloadAction<TCustomerRequest[]>
    ) {
      state.newCustomerRequestList = action.payload;
    },
  },
});

export const { setSpecificCustomerRequestList, setNewCustomerRequestList } =
  snackbarSlice.actions;
export default snackbarSlice.reducer;
