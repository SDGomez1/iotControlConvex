"use client";

import Card from "components/dashboard/Card";
import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { formatUrl } from "lib/utils";

export default function () {
  const availableOrganizations = useQuery(
    api.organization.getUserOrganizations,
  );

  const organizationCards = availableOrganizations?.map((info, index) => {
    const url = formatUrl(info.name, info._id);
    return (
      <Card
        titulo={info.name}
        descripcion={info.description}
        url={`userDashboard/${url}`}
        key={index}
      />
    );
  });
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-gray-50 py-4 lg:grid lg:auto-rows-max lg:grid-cols-3 lg:px-10">
      {organizationCards}
    </main>
  );
}
