"use client";
import { Protect, useOrganizationList, useSession } from "@clerk/nextjs";
import Admin from "./Admin";
import User from "./User";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function dashboard() {
  const router = useRouter();
  const session = useSession();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (setActive) {
      setActive({
        organization: "org_2dSi93ePI2j6ChAUUT3dGSCQAJp",
      });
    }
  }, []);

  if (session) {
    return (
      <Protect permission="org:admin:usage" fallback={<User />}>
        <Admin />
      </Protect>
    );
  } else {
    router.push("/");
  }
}
