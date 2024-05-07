import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { newDeviceFunctionData } from "types/newDeviceFunctions";
import { update } from "../databaseData/dataBaseDataSlice";

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
    updateFunction: (state, action: PayloadAction<newDeviceFunctionData>) => {
      let newArray = state.slice();
      let indexOfTheArray = newArray.findIndex(
        (data) => data.id === action.payload.id,
      );
      newArray[indexOfTheArray] = action.payload;
      return newArray;
    },
    deleteFunction: (state, action: PayloadAction<string>) => {
      let newArray = state.slice();
      let indexOfTheArray = newArray.findIndex(
        (data) => data.id === action.payload,
      );
      newArray.splice(indexOfTheArray, 1);
      return newArray;
    },
  },
});

export const { add, clean, updateFunction, deleteFunction } =
  newDeviceFunctionsSlice.actions;

export default newDeviceFunctionsSlice.reducer;
