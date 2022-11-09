/**
 * WRITTEN DATE: 2022/11/09
 * AUTHOR: TONGIL KIM
 * PURPOSE:  snackbar 메시지에 대한 state를 관리하는 slice
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TinitialState = {
  openSnackBar: boolean;
  snackbarMsg: string;
};

const initialState: TinitialState = {
  openSnackBar: false,
  snackbarMsg: "",
};

const snackbarSlice = createSlice({
  name: "snackBar",
  initialState,
  reducers: {
    setOpenSnackBar(state, action: PayloadAction<boolean>) {
      state.openSnackBar = action.payload;
    },
    setSnackBarMsg(state, action: PayloadAction<string>) {
      state.snackbarMsg = action.payload;
    },
  },
});

export const { setOpenSnackBar, setSnackBarMsg } = snackbarSlice.actions;
export default snackbarSlice.reducer;
