import { Doc, Id } from "convex/_generated/dataModel";
import type { ActiveSessionResource } from "@clerk/types";

export type invitation = {
  teams: Doc<"team">[];
  invitations: Doc<"invitations">[];
};

export type databaseDataFormat = {
  invitationsByUser: invitation | undefined;
  userActiveTeam: Id<"team">;
  userActiveTeamInfo: Doc<"team">;
  userTeams: Doc<"team">[];
  currentUser: ActiveSessionResource;
};

export type teamDeviceStatus = {
  deviceId: Id<"device">;
  isOnline: boolean;
};
