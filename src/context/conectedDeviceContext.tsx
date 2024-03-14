import { conectedDeviceData } from "lib/types";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

type actionType = {
  type: string;
  payload: conectedDeviceData;
};

const ConectedDeviceContext = createContext<conectedDeviceData[]>([]);
const ConectedDeviceDispatchContext = createContext<any>(null);

export function ConectedDeviceProvider({ children }: PropsWithChildren) {
  const [conectedDevice, dispatch] = useReducer(conectedDeviceReducer, []);
  return (
    <ConectedDeviceContext.Provider value={conectedDevice}>
      <ConectedDeviceDispatchContext.Provider value={dispatch}>
        {children}
      </ConectedDeviceDispatchContext.Provider>
    </ConectedDeviceContext.Provider>
  );
}

function conectedDeviceReducer(
  conectedDevice: conectedDeviceData[],
  action: actionType
) {
  switch (action.type) {
    case "added": {
      return [
        ...conectedDevice,
        {
          id: action.payload.id,
          device: action.payload.device,
        },
      ];
    }
    default:
      return [...conectedDevice];
  }
}
