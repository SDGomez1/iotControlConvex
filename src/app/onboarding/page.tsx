import { auth } from "@clerk/nextjs";
import { api } from "convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

export default async function Onboarding() {
  const firstlogin = await fetchQuery(api.user.userFirstLogin);
  const user = auth();

  return (
    <div>
      <p> {user.session ? "true" : "false"}</p>
    </div>
  );
}
