import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { serialData } from "types/serial";
const initialState: serialData[] = [];

const rawSerialDataSlice = createSlice({
  name: "rawSerialDataSlice",
  initialState,
  reducers: {
    addRawSerialData: (state, action: PayloadAction<serialData>) => {
      const maxPerId = 100;
      let newState = state.slice();
      const sameIdItems = state.filter((item) => item.id === action.payload.id);

      if (sameIdItems.length >= maxPerId) {
        const oldestItemId = sameIdItems[0];
        newState = state.filter((item) => item !== oldestItemId);
      }

      newState.push(action.payload);

      return newState;
    },
    cleanRawSerialData: (state, action: PayloadAction<string>) => {
      let newArray = state.slice();
      let filteredArray = newArray.filter((item) => item.id !== action.payload);
      return filteredArray;
    },
  },
});

export const { addRawSerialData, cleanRawSerialData } =
  rawSerialDataSlice.actions;

export default rawSerialDataSlice.reducer;
