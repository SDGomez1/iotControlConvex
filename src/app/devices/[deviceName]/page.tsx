"use client";

import { Protect } from "@clerk/nextjs";
import Navbar from "components/dashboard/navbar";
import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useQuery } from "convex/react";

import { deFormatUrl } from "lib/utils";
import { useParams } from "next/navigation";

export default function Device() {
  const params = useParams<{ deviceName: string }>();
  const deviceId = deFormatUrl(params.deviceName);
  const device = useQuery(api.device.getdeviceById, {
    deviceId: deviceId as Id<"device">,
  });
  return (
    <Protect>
      <Navbar />
      <div>{device?.nombre}</div>
      <div>{device?.description}</div>
    </Protect>
  );
}
