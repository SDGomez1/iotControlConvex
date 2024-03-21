import { conectedDeviceData } from "lib/types";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

interface actionType {
  type: string;
  payload: conectedDeviceData;
}

const conectedDeviceContext = createContext<conectedDeviceData[]>([]);
const conectedDeviceDispatchContext = createContext<Dispatch<actionType>>(
  () => {},
);

export function useConnectedDevice() {
  return useContext(conectedDeviceContext);
}
export function useConnectedDeviceDispatch() {
  return useContext(conectedDeviceDispatchContext);
}

function conectedDeviceReducer(
  conectedDevice: conectedDeviceData[],
  action: actionType,
) {
  switch (action.type) {
    case "ADD": {
      return [
        ...conectedDevice,
        {
          id: action.payload.id,
          device: action.payload.device,
          reader: action.payload.reader,
        },
      ];
    }
    default:
      return [...conectedDevice];
  }
}

export function ConectedDeviceProvider({ children }: PropsWithChildren) {
  const [conectedDevice, dispatch] = useReducer(conectedDeviceReducer, []);
  return (
    <conectedDeviceContext.Provider value={conectedDevice}>
      <conectedDeviceDispatchContext.Provider value={dispatch}>
        {children}
      </conectedDeviceDispatchContext.Provider>
    </conectedDeviceContext.Provider>
  );
}
