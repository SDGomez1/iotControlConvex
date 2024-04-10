"use client";

import { api } from "convex/_generated/api";
import { useQuery } from "convex/react";
import { formatUrl } from "utils/urlUtils";

export default function () {
  const availableOrganizations = useQuery(api.team.getUserTeams);

  const organizationCards = availableOrganizations?.map((info, index) => {
    const url = formatUrl(info.name, info._id);
    return;
  });
  return (
    <main className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-gray-50 py-4 lg:grid lg:auto-rows-max lg:grid-cols-3 lg:px-10"></main>
  );
}
