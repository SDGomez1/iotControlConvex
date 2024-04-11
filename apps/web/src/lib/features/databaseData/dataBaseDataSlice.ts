import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Doc, Id } from "convex/_generated/dataModel";
import type { databaseDataFormat } from "types/databaseData";
import type { ActiveSessionResource } from "@clerk/types";
const initialState: databaseDataFormat = {
  invitationsByUser: undefined,
  userActiveTeam: "" as Id<"team">,
  userActiveTeamInfo: {} as Doc<"team">,
  userTeams: [],
  currentUser: {} as ActiveSessionResource,
};

const databaseDataSlice = createSlice({
  name: "dataBaseData",
  initialState: initialState,
  reducers: {
    update: (state, action: PayloadAction<databaseDataFormat>) =>
      action.payload,
  },
});

export const { update } = databaseDataSlice.actions;

export default databaseDataSlice.reducer;
