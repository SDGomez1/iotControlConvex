"use client";

import { useRouter } from "next/navigation";

export default function Onboarding() {
  const router = useRouter();
  return (
    <div>
      <p>Onboarding</p>
      <button
        onClick={() => router.push("/onboarding/selectTeam")}
        className=" border p-2 "
      >
        FinishConfig
      </button>
    </div>
  );
}
