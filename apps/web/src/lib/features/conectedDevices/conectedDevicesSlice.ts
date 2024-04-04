import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { conectedDeviceData } from "types/serial";
const initialState: conectedDeviceData[] = [];

const conectedDevicesSlice = createSlice({
  name: "ConectedDevices",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<conectedDeviceData>) => {
      state.push(action.payload);
    },
    remove: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
  },
});

export const { add, remove } = conectedDevicesSlice.actions;

export default conectedDevicesSlice.reducer;
