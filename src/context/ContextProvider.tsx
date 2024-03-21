import { PropsWithChildren } from "react";
import { ConectedDeviceProvider } from "./conectedDeviceContext";
import { SerialDataProvider } from "./serialDataContext";

export default function ContextProvider({ children }: PropsWithChildren) {
  return (
    <>
      <ConectedDeviceProvider>
        <SerialDataProvider>{children}</SerialDataProvider>
      </ConectedDeviceProvider>
    </>
  );
}
