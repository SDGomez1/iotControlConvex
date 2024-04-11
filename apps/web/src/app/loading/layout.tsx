import { currentUser } from "@clerk/nextjs";
import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";

export default async function LoadingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  const userActiveTeamInfo = await fetchQuery(
    api.team.getActiveTeamInfoWithServer,
    { userId: user?.id as string },
  );
  console.log(userActiveTeamInfo);
  if (userActiveTeamInfo && user) {
    if (userActiveTeamInfo.adminId === user.id) {
      redirect("/admin");
    } else {
      redirect("/user");
    }
  }

  return <>{children}</>;
}
