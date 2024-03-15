async function getPorts() {
  return await navigator.serial.getPorts();
}

async function connectToSerial() {
  const port = await navigator.serial.requestPort();
  if (port) {
    await port.open({ baudRate: 9600 });
    return port;
  }
}

async function writeToPort(port: SerialPort | undefined, message: string) {
  const encoder = new TextEncoder();
  if (port !== undefined) {
    const writer = port.writable.getWriter();
    await writer.write(encoder.encode(message));
    writer.releaseLock();
  }
}

async function closePort(port: SerialPort | undefined) {
  if (port !== undefined) {
    await port.close();
  }
}

export { connectToSerial, writeToPort, closePort, getPorts };
