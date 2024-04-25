import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import { redirect } from "next/navigation";

export default async function SelectTeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userActiveTeam = await fetchQuery(api.user.getUserActiveTeam);

  if (!userActiveTeam) {
    redirect("/loading");
  }

  return <>{children}</>;
}
