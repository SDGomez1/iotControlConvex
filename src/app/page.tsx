"use client";
import { SignInButton, SignOutButton, auth, useSession } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
export default function Home() {
  const { isSignedIn } = useSession();
  const createCommand = useMutation(api.commands.createCommand);
  return (
    <main>
      {isSignedIn ? (
        <SignOutButton></SignOutButton>
      ) : (
        <SignInButton></SignInButton>
      )}
      {isSignedIn && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const formdata = new FormData(e.currentTarget);
            const command = formdata.get("command") as string;
            createCommand({ value: command });
            form.reset();
          }}
        >
          <label>Command</label>
          <input name="command" />
          <button> send</button>
        </form>
      )}
    </main>
  );
}
