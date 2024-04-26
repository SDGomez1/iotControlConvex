"use client";
import Skeleton from "components/dashboard/Skeleton";

import { writeToPort } from "utils/serialUtils";

import { updateStatus } from "lib/features/fileEnqueu/fileEnqueuSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";

import { useEffect } from "react";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const commands = useQuery(api.commands.readFirstCommand);

  const getFileUrl = useMutation(api.device.generateUploadUrl);
  const writeFileToDb = useMutation(api.device.sendFile);

  const dispatch = useAppDispatch();

  const deviceConected = useAppSelector((state) => state.conectedDevice);

  const dataToSend = useAppSelector((state) => state.fileEnqueu);
  useEffect(() => {
    if ("serial" in navigator) {
      if (commands && deviceConected.length > 0) {
        const targetDevice = deviceConected.find(
          (device) => device.id === commands.deviceId,
        );
        writeToPort(targetDevice?.device, commands.command as string);
      }
    }
  });

  useEffect(() => {
    dataToSend.forEach(async (data) => {
      if (!data.uploaded) {
        const url = await getFileUrl();
        const result = await fetch(url, {
          method: "POST",
          body: data.file,
        });
        const { storageId } = await result.json();
        await writeFileToDb({
          storageId: storageId,
          deviceId: data.deviceId as Id<"device">,
        });
        dispatch(updateStatus(data.deviceId));
      }
    });
  }, [dataToSend]);
  return <Skeleton>{children}</Skeleton>;
}
