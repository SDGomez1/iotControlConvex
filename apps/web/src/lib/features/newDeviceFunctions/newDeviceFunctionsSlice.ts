import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { newDeviceFunctionData } from "types/newDeviceFunctions";

const initialState: newDeviceFunctionData[] = [];

const newDeviceFunctionsSlice = createSlice({
  name: "newDeviceFunctions",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<newDeviceFunctionData>) => [
      ...state,
      action.payload,
    ],
    clean: (state) => {
      let newArray = state.slice();
      newArray.splice(0, newArray.length);
      return newArray;
    },
  },
});

export const { add, clean } = newDeviceFunctionsSlice.actions;

export default newDeviceFunctionsSlice.reducer;
