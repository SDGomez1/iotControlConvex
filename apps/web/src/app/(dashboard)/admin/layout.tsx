"use client";
import Skeleton from "components/dashboard/Skeleton";

import { writeToPort } from "utils/serialUtils";

import { updateFileQueue } from "lib/features/fileQueue/fileQueueSlice";
import { useAppDispatch, useAppSelector } from "lib/hooks";

import { useEffect } from "react";

import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { posibleStatus } from "types/serial";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useAppDispatch();

  const dataToSend = useAppSelector((state) => state.fileEnqueu);
  const deviceConected = useAppSelector((state) => state.conectedDevice);
  const conectedDeviceIds = deviceConected.map(
    (data) => data.id as Id<"device">,
  );

  const pendingCommands = useQuery(api.command.getPendingCommandsByDeviceId, {
    deviceId: conectedDeviceIds,
  });

  const commands = useQuery(api.command.getCommandsByDeviceId, {
    deviceId: conectedDeviceIds,
  });

  const getFileUrl = useMutation(api.device.generateUploadUrl);
  const writeFileToDb = useMutation(api.device.sendFile);
  const updateCommandStatus = useMutation(api.command.updateCommandStatus);

  useEffect(() => {
    if (!("serial" in navigator)) {
      return;
    }
    if (!pendingCommands || deviceConected.length <= 0) {
      return;
    }
    if (pendingCommands.length <= 0) {
      return;
    }

    pendingCommands.forEach((command) => {
      if (!command) {
        return;
      }

      const targetDevice = deviceConected.find(
        (device) => device.id === command.functionData?.deviceId,
      );

      const formattedCommand = `${command.functionData?.command}${command.payload}`;
      writeToPort(targetDevice?.device, formattedCommand);

      if (command.functionData?.sendData) {
        updateCommandStatus({
          commandId: command.commandId,
          status: posibleStatus.INPROCESS,
        });
      } else {
        updateCommandStatus({
          commandId: command.commandId,
          status: posibleStatus.FINISHED,
        });
      }
    });
  });

  useEffect(() => {
    dataToSend.forEach((data) => {
      if (!commands) {
        return;
      }
      if (commands.length <= 0) {
        dispatch(updateFileQueue(data.id));
        return;
      }
      const commandInProcess = commands.filter(
        (command) => command.status === posibleStatus.INPROCESS,
      );
      commandInProcess.forEach(async (command) => {
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
        updateCommandStatus({
          commandId: command.commandId,
          status: posibleStatus.FINISHED,
        });
      });
      dispatch(updateFileQueue(data.id));
    });
  }, [dataToSend]);
  return <Skeleton isAdmin={true}>{children}</Skeleton>;
}
