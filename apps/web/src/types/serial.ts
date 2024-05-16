export type ReadableData = {
  value: Uint8Array;
  done: Boolean;
};
export type conectedDeviceData = {
  id: string;
  device: SerialPort;
  reader: ReadableStreamDefaultReader;
};

export type serialData = {
  id: string;
  data: string;
};

export enum posibleStatus {
  PENDING = "PENDING",
  INPROCESS = "INPROCESS",
  FINISHED = "FINISHED",
}
