export type newDeviceFunctionData = {
  id: string;
  name: string;
  description: string;
  tEntry: typeOfEntry;
  command: string | number;
  blocking: boolean;
  userInfo: boolean;
  userTEntry: typeOfEntry | undefined;
  unit: string | undefined;
  symbol: string | undefined;
  format: typeOfFormat | undefined;
  maxInterval: number | undefined;
  minInterval: number | undefined;
  message: string | undefined;
  streaming: boolean;
};

export enum typeOfEntry {
  string = "STRING",
  number = "NUMBER",
}

export enum typeOfFormat {
  interval = "INTERVAL",
  scale = "SCALE",
}
