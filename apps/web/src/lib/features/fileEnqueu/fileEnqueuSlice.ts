import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { action } from "convex/_generated/server";
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
          // Return a new object with the updated status

          return { ...value, uploaded: true };
        }
        // Return the item unchanged if the id does not match
        return value;
      }),
  },
});
export const { add, updateStatus } = fileEnqueuSlice.actions;

export default fileEnqueuSlice.reducer;
