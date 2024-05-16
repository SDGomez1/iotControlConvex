import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { fileEnque } from "types/fileEnqueu";

const initialState: fileEnque[] = [];

const fileQueueSlice = createSlice({
  name: "fileQueue",
  initialState,
  reducers: {
    addFileQueue: (state, action: PayloadAction<fileEnque>) => [
      ...state,
      action.payload,
    ],
    updateFileQueue: (state, action: PayloadAction<string>) =>
      state.map((value) => {
        if (value.deviceId === action.payload) {
          return { ...value, uploaded: true };
        }
        return value;
      }),
  },
});
export const { addFileQueue, updateFileQueue } = fileQueueSlice.actions;

export default fileQueueSlice.reducer;
