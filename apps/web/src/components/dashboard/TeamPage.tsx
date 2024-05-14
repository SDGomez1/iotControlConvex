"use client";
import { useAppSelector } from "lib/hooks";

export default function TeamPage(props: { isAdmin: boolean }) {
  const currentTeamInfo = useAppSelector(
    (state) => state.databaseData.userActiveTeamInfo,
  );
  return (
    <section className="h-full overflow-y-scroll px-4 pb-40">
      <h2 className="my-0 mb-2 border-none bg-transparent px-0 text-xl font-semibold outline-none focus:ring-0 lg:text-4xl">
        {currentTeamInfo.name}
      </h2>
      <h3 className="mb-2 font-medium lg:text-xl">Administrador</h3>

      <h3 className="mb-2 font-medium lg:text-xl">Integrantes</h3>
    </section>
  );
}
