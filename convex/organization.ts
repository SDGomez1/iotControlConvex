import { query } from "./_generated/server";

export const getUserOrganizations = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    const organization = await ctx.db.query("organization").collect();
    const userOrganization = organization.filter((organization) =>
      organization.userRegistered.includes(user?.subject as string)
    );

    return userOrganization;
  },
});
