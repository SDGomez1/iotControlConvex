import { currentUser } from "@clerk/nextjs";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { fetchQuery, fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const newTeamId = searchParams.teamId;
  const user = await currentUser();
  const userActiveTeamInfo = await fetchQuery(
    api.team.getActiveTeamInfoWithServer,
    { userId: user?.id as string },
  );

  if (userActiveTeamInfo && user) {
    if (userActiveTeamInfo._id !== newTeamId) {
      if (newTeamId) {
        const change = await fetchMutation(api.user.setActiveTeam, {
          teamId: newTeamId as Id<"team">,
          userID: user.id,
        });
        const newTeamData = await fetchQuery(api.team.getTeamById, {
          teamId: newTeamId as Id<"team">,
        });

        if (newTeamData) {
          if (newTeamData.adminId === user.id) {
            redirect("/admin");
          } else {
            redirect("/user");
          }
        }
      }
    }

    if (userActiveTeamInfo.adminId === user.id) {
      redirect("/admin");
    } else {
      redirect("/user");
    }
  }
  return <div>Loading</div>;
}
