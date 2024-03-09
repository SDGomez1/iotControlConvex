"use client";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { SignOutButton } from "@clerk/nextjs";

export default function User() {
  const createCommand = useMutation(api.commands.createCommand);

  return (
    <div>
      <button
        onClick={() => {
          createCommand({ value: "A" });
        }}
      >
        Prender led
      </button>
      <button
        onClick={() => {
          createCommand({ value: "S" });
        }}
      >
        apagar led
      </button>
      <SignOutButton />
    </div>
  );
}
