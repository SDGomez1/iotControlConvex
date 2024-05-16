import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { fileQueue } from "types/fileEnqueu";

const initialState: fileQueue[] = [];

const fileQueueSlice = createSlice({
  name: "fileQueue",
  initialState,
  reducers: {
    addFileQueue: (state, action: PayloadAction<fileQueue>) => [
      ...state,
      action.payload,
    ],
    updateFileQueue: (state, action: PayloadAction<string>) =>
      state.filter((data) => data.id !== action.payload),
  },
});
export const { addFileQueue, updateFileQueue } = fileQueueSlice.actions;

export default fileQueueSlice.reducer;
