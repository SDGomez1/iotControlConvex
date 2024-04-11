import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { databaseDataFormat } from "types/databaseData";

const initialState: databaseDataFormat = {
  invitationsByUser: undefined,
  userActiveTeam: undefined,
  userActiveTeamInfo: undefined,
  userTeams: [],
};

const databaseDataSlice = createSlice({
  name: "dataBaseData",
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<databaseDataFormat>) =>
      (state = action.payload),
  },
});

export const { update } = databaseDataSlice.actions;

export default databaseDataSlice.reducer;
