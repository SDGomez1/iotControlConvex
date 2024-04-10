import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const createInvitation = mutation({
  args: {
    teamId: v.id("team"),
    userId: v.id("user"),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("invitations", {
      teamId: args.teamId,
      userId: args.userId,
    });
  },
});

export const getInvitationByUser = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    const invitations = await ctx.db
      .query("invitations")
      .filter((q) => q.eq(q.field("userId"), user?.subject))
      .collect();
    if (invitations.length === 0) {
      return;
    }
    let teams: Doc<"team">[] = [];
    for (var i = 0; i < invitations.length; i++) {
      let actualTeam = await ctx.db.get(invitations[i].teamId);
      teams.push(actualTeam as Doc<"team">);
    }

    return { teams, invitations };
  },
});

export const setInvitationAccepted = mutation({
  args: {
    invitationId: v.id("invitations"),
  },
  handler: async (ctx, args) => {
    const invitation = await ctx.db.get(args.invitationId);
    if (!invitation) {
      return;
    }
    const team = await ctx.db.get(invitation.teamId);
    if (!team) {
      return;
    }
    await ctx.db.patch(invitation.teamId, {
      userRegistered: [...team.userRegistered, invitation.userId],
    });

    await ctx.db.delete(invitation._id);
  },
});

export const setInvitationRejected = mutation({
  args: {
    invitationId: v.id("invitations"),
  },
  handler: async (ctx, args) => {
    const invitation = await ctx.db.get(args.invitationId);
    if (!invitation) {
      return;
    }
    await ctx.db.delete(invitation._id);
  },
});
