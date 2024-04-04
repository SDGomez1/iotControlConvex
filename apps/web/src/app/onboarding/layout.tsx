import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { api } from "convex/_generated/api";

export default async function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  if (!user) {
    redirect("/");
  }
  const firstLogin = await fetchQuery(api.user.getUserFirstLogin, {
    userId: user.id,
  });
  if (firstLogin !== null) {
    if (firstLogin) {
      return <main className="h-screen w-full">{children}</main>;
    } else {
      redirect("/adminDashboard");
    }
  }
}
