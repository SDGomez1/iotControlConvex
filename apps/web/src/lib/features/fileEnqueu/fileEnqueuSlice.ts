import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { fileEnque } from "types/fileEnqueu";

const initialState: fileEnque[] = [];

const fileEnqueuSlice = createSlice({
  name: "fileEnqueu",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<fileEnque>) => [
      ...state,
      action.payload,
    ],
    updateStatus: (state, action: PayloadAction<string>) =>
      state.map((value) => {
        if (value.deviceId === action.payload) {
          return { ...value, uploaded: true };
        }
        return value;
      }),
  },
});
export const { add, updateStatus } = fileEnqueuSlice.actions;

export default fileEnqueuSlice.reducer;
