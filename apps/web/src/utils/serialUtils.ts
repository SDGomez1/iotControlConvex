import { storeInstace } from "../lib/store";
import { add } from "../lib/features/serialData/serialDataSlice";
import { createDataBlob } from "./FileProcessingUtils";

const currentSerialData = storeInstace.getState().serialData;
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
  if (port) {
    const writer = port.writable.getWriter();
    await writer.write(encoder.encode(message));
    writer.releaseLock();
  }
}

async function getReader(port: SerialPort | undefined) {
  if (port) {
    const reader = port.readable.getReader();
    return reader;
  }
}

async function closePort(
  port: SerialPort | undefined,
  reader: ReadableStreamDefaultReader | undefined,
) {
  if (port && reader) {
    reader.cancel();
    reader.releaseLock();
    await port.close();
  }
}

async function startReading(
  port: SerialPort | undefined,
  reader: ReadableStreamDefaultReader | undefined,
  deviceId: string,
) {
  if (port && reader) {
    try {
      let word = "";
      let begin = false;
      let sended = false;
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const encodedData = value as Uint8Array;

        for (const data of encodedData) {
          if (data === 10) {
            if (word.includes("start")) {
              begin = true;
              sended = false;
            }
            if (word.includes("finish")) {
              begin = false;
              if (!sended) {
                createDataBlob(deviceId);
                sended = true;
              }
            }
            if (begin) {
              storeInstace.dispatch(
                add({
                  id: deviceId,
                  data: word,
                }),
              );
            }
            word = "";
          } else {
            const decodedData = String.fromCharCode(data);
            word += decodedData;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    return "";
  }
}

export {
  connectToSerial,
  writeToPort,
  closePort,
  getPorts,
  getReader,
  startReading,
};
