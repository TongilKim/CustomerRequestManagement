/**
 * WRITTEN DATE: 2022/11/14
 * AUTHOR: TONGIL KIM
 * PURPOSE:  완료된 문의에 대한 state를 관리하는 slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TCompletedCustomerRequest } from "../../type";

type TInitialState = {
  completedRequestListForCounselor: TCompletedCustomerRequest[];
};

const initialState: TInitialState = {
  completedRequestListForCounselor: [],
};

const completedRequestSlice = createSlice({
  name: "completedCustomerRequest",
  initialState,
  reducers: {
    setCompletedRequestListForCounselor(
      state,
      action: PayloadAction<TCompletedCustomerRequest[]>
    ) {
      state.completedRequestListForCounselor = action.payload;
    },
  },
});

export const { setCompletedRequestListForCounselor } =
  completedRequestSlice.actions;
export default completedRequestSlice.reducer;
