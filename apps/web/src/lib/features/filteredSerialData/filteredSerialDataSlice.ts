import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { serialData } from "types/serial";
const initialState: serialData[] = [];

const filteredSerialDataSlice = createSlice({
  name: "filteredSerialData",
  initialState,
  reducers: {
    addFilteredSerialData: (state, action: PayloadAction<serialData>) => [
      ...state,
      action.payload,
    ],
    updateFilteredSerialData: (state, action: PayloadAction<serialData[]>) => {
      return action.payload;
    },
  },
});

export const { addFilteredSerialData, updateFilteredSerialData } =
  filteredSerialDataSlice.actions;

export default filteredSerialDataSlice.reducer;
