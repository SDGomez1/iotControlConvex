"use client";
import { Protect, useSession } from "@clerk/nextjs";
import Admin from "./Admin";
import User from "./User";
import { useRouter } from "next/navigation";
import { ConectedDeviceProvider } from "../../context/conectedDeviceContext";

export default function dashboard() {
  const router = useRouter();
  const session = useSession();
  if (session) {
    return (
      <Protect permission="org:admin:usage" fallback={<User />}>
        <ConectedDeviceProvider>
          <Admin />
        </ConectedDeviceProvider>
      </Protect>
    );
  } else {
    router.push("/");
  }
}
