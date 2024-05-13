"use client";
import Sidebar from "components/dashboard/Sidebar";
import Topbar from "components/dashboard/Topbar";

import { useAppSelector } from "lib/hooks";

import { useState } from "react";

export default function Skeleton(props: {
  children: React.ReactNode;
  isAdmin: boolean;
}) {
  const userTeams = useAppSelector((state) => state.databaseData.userTeams);
  const userActiveTeamInfo = useAppSelector(
    (state) => state.databaseData.userActiveTeamInfo,
  );
  const currentUser = useAppSelector((state) => state.databaseData.currentUser);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex h-screen w-screen lg:max-h-screen dark:bg-dark">
      <Sidebar
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        isAdmin={props.isAdmin}
        userTeams={userTeams}
        userActiveTeamInfo={userActiveTeamInfo}
        currentUser={currentUser}
      />

      <section className="relative max-h-screen w-full overflow-hidden lg:px-12">
        <Topbar
          setIsOpen={setIsOpen}
          currentTeam={userActiveTeamInfo}
          currentUser={currentUser}
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
