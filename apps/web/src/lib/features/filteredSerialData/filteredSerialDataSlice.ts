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
  },
});

export const { addFilteredSerialData } = filteredSerialDataSlice.actions;

export default filteredSerialDataSlice.reducer;
