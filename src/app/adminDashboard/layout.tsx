"use client";
import { PropsWithChildren, useEffect } from "react";
import { useConnectedDevice } from "context/conectedDeviceContext";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";
import { writeToPort } from "lib/Serial";

export default function AdminLayout({ children }: PropsWithChildren) {
  const commands = useQuery(api.commands.readFirstCommand);
  const deviceConected = useConnectedDevice();
  console.log(deviceConected);
  useEffect(() => {
    if (commands !== undefined && deviceConected.length > 0) {
      const targetDevice = deviceConected.find(
        (device) => device.id === commands?.deviceId
      );
      writeToPort(targetDevice?.device, commands?.command as string);
    }
  });
  return <div>{children}</div>;
}
