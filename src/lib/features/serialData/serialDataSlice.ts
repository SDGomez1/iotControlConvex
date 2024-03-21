import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { serialData } from "lib/types";
const initialState: serialData[] = [];

const serialDataSlice = createSlice({
  name: "serialData",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<serialData>) => [
      ...state,
      action.payload,
    ],
  },
});

export const { add } = serialDataSlice.actions;

export default serialDataSlice.reducer;
