import { serialData } from "lib/types";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

interface actionType {
  type: string;
  payload: serialData;
}

const serialDataContext = createContext<serialData[]>([]);
const serialDataDispatchContext = createContext<Dispatch<actionType>>(() => {});

export function useSerialData() {
  return useContext(serialDataContext);
}
export function useSerialDataDispatch() {
  return useContext(serialDataDispatchContext);
}

function serialDataReducer(serialData: serialData[], action: actionType) {
  switch (action.type) {
    case "ADD": {
      return [
        ...serialData,
        {
          id: action.payload.id,
          data: action.payload.data,
        },
      ];
    }
    default:
      return [...serialData];
  }
}

export function SerialDataProvider({ children }: PropsWithChildren) {
  const [conectedDevice, dispatch] = useReducer(serialDataReducer, []);
  return (
    <serialDataContext.Provider value={conectedDevice}>
      <serialDataDispatchContext.Provider value={dispatch}>
        {children}
      </serialDataDispatchContext.Provider>
    </serialDataContext.Provider>
  );
}
