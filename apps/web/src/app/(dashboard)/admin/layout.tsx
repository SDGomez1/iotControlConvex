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

  const commands = useQuery(api.command.getCommandsByDeviceId, {
    deviceId: conectedDeviceIds,
  });

  const getFileUrl = useMutation(api.device.generateUploadUrl);
  const writeFileToDb = useMutation(api.device.sendFile);
  const deleteCommand = useMutation(api.command.deleteCommandById);
  const updateCommandStatus = useMutation(api.command.updateCommandStatus);

  useEffect(() => {
    if ("serial" in navigator) {
      if (commands && deviceConected.length > 0) {
        if (commands.length > 0) {
          type commandData = (typeof commands)[0];
          const latestCommandsMap = new Map<string, commandData>();

          for (const command of commands) {
            if (!command.functionData || !command.functionData.deviceId)
              continue;
            const deviceId = command.functionData.deviceId;

            const existingCommand = latestCommandsMap.get(deviceId);
            if (
              !existingCommand ||
              existingCommand.functionData!._creationTime <
                command.functionData._creationTime
            ) {
              latestCommandsMap.set(deviceId, command);
            }
          }

          const latestCommandsArrayFromMap: commandData[] = Array.from(
            latestCommandsMap.values(),
          );

          latestCommandsArrayFromMap.forEach((command) => {
            switch (command.status) {
              case posibleStatus.PENDING: {
                const targetDevice = deviceConected.find(
                  (device) => device.id === command.functionData?.deviceId,
                );
                writeToPort(
                  targetDevice?.device,
                  command.functionData?.command as string,
                );
                if (command.functionData?.sendData) {
                  updateCommandStatus({
                    commandId: command.commandId,
                    status: posibleStatus.INPROCESS,
                  });
                } else {
                  deleteCommand({ commandId: command.commandId });
                }
                break;
              }
              case posibleStatus.FINISHED: {
                deleteCommand({ commandId: command.commandId });
                break;
              }
              default:
                break;
            }
          });
        }
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
        dispatch(updateFileQueue(data.deviceId));
      }
    });
  }, [dataToSend]);
  return <Skeleton>{children}</Skeleton>;
}
