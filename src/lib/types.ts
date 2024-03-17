export type FunctionData = {
  index: string;
  nombre: string;
  descripcion: string;
  comando: string;
};

export type conectedDeviceData = {
  id: string;
  device: SerialPort;
};

export type ActiveLinks = {
  link: string;
  location: string;
  url: string;
};
