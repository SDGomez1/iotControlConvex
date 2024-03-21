export type FunctionData = {
  index: string;
  nombre: string;
  descripcion: string;
  comando: string;
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

export type ActiveLinks = {
  link: string;
  location: string;
  url: string;
};

export type ReadableData = {
  value: Uint8Array;
  done: Boolean;
};
