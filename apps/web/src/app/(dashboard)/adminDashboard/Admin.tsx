"use client";

import Card from "components/common/Card";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { formatUrl } from "utils/urlUtils";

export default function Admin() {
  const devicesList = useQuery(api.device.getdevices, {
    teamId: "jx714hm6fqewpbaca61pmye3yd6p6zge" as Id<"team">,
  });

  const devicesCards = devicesList?.map((device, index) => {
    const url = formatUrl(device.name, device._id);

    return (
      <Card
        titulo={device.name}
        descripcion={device.description}
        url={`adminDashboard/devices/${url}`}
        key={index}
      />
    );
  });
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-gray-50 py-4 lg:grid lg:auto-rows-max lg:grid-cols-3 lg:px-10">
      {devicesCards}
    </main>
  );
}
