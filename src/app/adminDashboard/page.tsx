"use client";
import { useOrganizationList, useSession } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Admin from "./Admin";
import { useEffect } from "react";

export default function AdminDashboard() {
  const sesion = useSession();
  const router = useRouter();
  const { setActive } = useOrganizationList();
  useEffect(() => {
    if (setActive) {
      setActive({
        organization: "org_2dSi93ePI2j6ChAUUT3dGSCQAJp",
      });
    }
  }, []);

  if (sesion) {
    const role = sesion.session?.user.organizationMemberships[0].role;
    if (role !== undefined) {
      if (role === "org:admin") {
        return <Admin />;
      } else {
        router.push("/userDashboard");
      }
    }
  } else {
    router.push("/");
  }
}
