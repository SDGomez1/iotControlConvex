"use client";

import Card from "components/common/Card";

import { useParams } from "next/navigation";
import { deFormatUrl, formatUrl } from "utils/urlUtils";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";

export default function () {
  const params = useParams<{ organizationName: string }>();
  const organizationId = deFormatUrl(params.organizationName);

  const devices = useQuery(api.device.getDeviceByTeamId, {
    teamId: organizationId as Id<"team">,
  });

  const deviceCard = devices?.map((device, index) => {
    const url = formatUrl(device.name, device._id);
    return (
      <Card
        titulo={device.name}
        descripcion={device.description}
        url={`${params.organizationName}/${url}`}
        key={index}
      />
    );
  });
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-gray-50 py-4 lg:grid lg:auto-rows-max lg:grid-cols-3 lg:px-10">
      {deviceCard}
    </main>
  );
}
