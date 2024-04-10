"use client";
import Sidebar from "components/dashboard/Sidebar";
import Topbar from "components/dashboard/Topbar";
import { Doc } from "convex/_generated/dataModel";
import type { ActiveSessionResource } from "@clerk/types";

import { ReactNode, useState } from "react";
interface invitation {
  teams: Doc<"team">[];
  invitations: Doc<"invitations">[];
}

export default function Skeleton(props: {
  userActiveTeamInfo: Doc<"team">;
  currentUser: ActiveSessionResource;
  userTeams: Doc<"team">[];
  children: ReactNode;
  invitationsByUser: invitation | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex h-screen w-screen lg:max-h-screen dark:bg-dark">
      <Sidebar
        isAdmin={true}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        userActiveTeamInfo={props.userActiveTeamInfo}
        userTeams={props.userTeams}
        currentUser={props.currentUser}
      />

      <section className="w-full lg:px-12">
        <Topbar
          setIsOpen={setIsOpen}
          invitationsByUser={props.invitationsByUser}
        />

        {props.children}
      </section>

      {isOpen ? (
        <div
          className={`fixed top-0 h-screen w-screen bg-black/15 transition-all lg:hidden dark:bg-black/65`}
        />
      ) : (
        <></>
      )}
    </main>
  );
}
