import { add } from "lib/features/fileEnqueu/fileEnqueuSlice";
import { storeInstace } from "../lib/store";
import { fileEnque } from "types/fileEnqueu";

function createDataBlob(deviceId: string) {
  const data = storeInstace.getState().serialData;

  const filteredData = data.map((value) => {
    if (value.id.includes(deviceId)) {
      return value.data;
    }
  });

  if (!filteredData) {
    return "No hay datos";
  }
  const filteredArray = filteredData.map((item) => `${item}\n`);
  const csvContent = filteredArray.join("");
  const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const payload: fileEnque = {
    deviceId: deviceId,
    file: csvBlob,
    uploaded: false,
  };
  storeInstace.dispatch(add(payload));
}

async function fetchAndReadStreamData(url: string) {
  const resonse = await fetch(url);
  const reader = await resonse.body?.getReader();
  let data = "";
  if (!reader) {
    return "No hay datos";
  }
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      return data;
    }
    var decodedData = new TextDecoder().decode(value);
    data = data + decodedData;
  }
}

function filterAndFormatData(data: string) {
  let lines = data.split("\n");
  lines = lines.filter((line) => line.trim() !== "");
  let allValues: string[] = [];

  lines.forEach((line) => {
    let parts = line.split(",");
    allValues.push(...parts);
  });

  return allValues;
}

export { createDataBlob, fetchAndReadStreamData, filterAndFormatData };
