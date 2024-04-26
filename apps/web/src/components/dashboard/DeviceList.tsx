"use client";
import Link from "next/link";

import { useAppSelector } from "lib/hooks";

import { formatUrl } from "utils/urlUtils";

import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

export default function DeviceList(props: { isAdmin: boolean }) {
  const userActiveTeam = useAppSelector(
    (state) => state.databaseData.userActiveTeam,
  );

  const devices = useQuery(api.device.getdevices, { teamId: userActiveTeam });

  const deviceItems = devices?.map((device) => {
    const url = formatUrl(device.name, device._id);
    return (
      <div
        className="dark:border-darkTex flex w-full shrink-0 flex-col gap-2 rounded border border-lightText p-4 lg:h-40 2xl:h-44 2xl:w-full "
        key={device._id}
      >
        <p className="font-medium 2xl:text-xl">{device.name}</p>
        <p className="mb-2 line-clamp-2 shrink-0 text-sm text-lightText 2xl:line-clamp-3 2xl:text-base dark:text-darkText">
          {device.description}
        </p>
        <span className="flex h-full items-end justify-end">
          <Link
            href={`/${props.isAdmin ? "admin" : "user"}/devices/${url}`}
            className="flex w-24 items-center justify-center  rounded bg-accent py-2 text-sm text-white"
          >
            Conectar
          </Link>
        </span>
      </div>
    );
  });
  return (
    <>
      {deviceItems?.length ? (
        deviceItems
      ) : (
        <p className="text-center text-sm text-lightText lg:text-base dark:text-darkText">
          No hay Dispositivos para este equipo
        </p>
      )}
    </>
  );
}
