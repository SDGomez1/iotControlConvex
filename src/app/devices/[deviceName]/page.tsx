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
  const functions = useQuery(api.deviceFunction.getFunctionByDeviceId, {
    deviceId: deviceId as Id<"device">,
  });

  const functionscom = functions?.map((e, i) => {
    return (
      <div>
        <div>{e.nombre}</div>
        <div>{e.descripcion}</div>
      </div>
    );
  });
  return (
    <Protect>
      <Navbar />
      <div>{device?.nombre}</div>
      <div>{device?.description}</div>
      <div>{functionscom}</div>
    </Protect>
  );
}
