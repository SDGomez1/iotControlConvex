import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createInvitation = mutation({
  args: {
    teamId: v.id("team"),
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("invitations", {
      teamId: args.teamId,
      userId: args.userId,
      accepted: false,
    });
  },
});

export const getInvitationByUser = query({
  args: {
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const invitations = await ctx.db
      .query("invitations")
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
    if (invitations.length === 0) {
      return;
    }
    let teams: any[] = [];
    for (var i = 0; i < invitations.length; i++) {
      let actualTeam = await ctx.db.get(invitations[i].teamId);
      teams.push(actualTeam);
    }

    return { teams, invitations };
  },
});

export const setInvitationAccepted = mutation({
  args: {
    invitationId: v.id("invitations"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.invitationId, {
      accepted: true,
    });
  },
});
