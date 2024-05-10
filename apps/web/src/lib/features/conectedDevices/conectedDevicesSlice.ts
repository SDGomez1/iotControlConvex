import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { conectedDeviceData } from "types/serial";
const initialState: conectedDeviceData[] = [];

const conectedDevicesSlice = createSlice({
  name: "ConectedDevices",
  initialState,
  reducers: {
    addConectedDevice: (state, action: PayloadAction<conectedDeviceData>) => {
      state.push(action.payload);
    },
    removeConectedDevice: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
  },
});

export const { addConectedDevice, removeConectedDevice } =
  conectedDevicesSlice.actions;

export default conectedDevicesSlice.reducer;
