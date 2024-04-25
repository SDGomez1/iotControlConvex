import { add } from "lib/features/fileEnqueu/fileEnqueuSlice";
import { storeInstace } from "../lib/store";
import { fileEnque } from "types/fileEnqueu";

interface GraphItem {
  [key: string]: number | string;
  index: number;
}

interface CardItem {
  title: string;
  data: number;
}

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

function getGraphData(data: string[]) {
  let filteredData = data.filter((data) => data.includes(">"));
  let variableNames: string[] = [];

  filteredData.forEach((line, index) => {
    variableNames.push(line.split(":")[0].replace(">", ""));
  });
  variableNames = [...new Set(variableNames)];
  let joinFormatedData = [];

  for (let i = 0; i < filteredData.length; i++) {
    let group = [];
    for (let j = 0; j < variableNames.length; j++) {
      if (i + j < filteredData.length) {
        group.push(filteredData[i + j]);
      }
    }
    if (group.length === variableNames.length) {
      joinFormatedData.push(group.join(";"));
    }
    i += variableNames.length - 1;
  }

  let jsonResult: GraphItem[] = [];

  joinFormatedData.forEach((item, index) => {
    let obj: GraphItem = { index: index + 1 };
    let pairs = item.split(";");
    pairs.forEach((pair) => {
      let match = pair.match(/>([^:]+):(.+)/);
      if (match && variableNames.includes(match[1])) {
        obj[match[1]] = Number(match[2]);
      }
    });
    jsonResult.push(obj);
  });

  return { jsonResult, variableNames };
}

function getDownloadData(input: string) {
  let lines = input.split("\n").filter((line) => line.trim() !== "");

  let variableNames: string[] = [];
  let dataRows: string[] = [];

  let startIndex = lines.findIndex((line) => line.includes(":"));

  if (startIndex === -1) {
    return "";
  }

  lines.slice(startIndex).forEach((line, index) => {
    const parts = line.split(",");
    if (index === 0) {
      variableNames = parts.map((part) => {
        let key = part.split(":")[0].trim();
        if (key.startsWith(">")) {
          key = key.substring(1);
        }
        if (key.startsWith("<")) {
          key = key.substring(1);
        }
        return key;
      });
    }
    const data = parts.map((part) => part.split(":")[1]);
    dataRows.push(data.join(","));
  });

  const data = variableNames.join(",") + "\n" + dataRows.join("\n");

  return data;
}

function getCardsData(data: string[]) {
  if (data.length === 0) {
    return []; // Return an empty array if no data is provided
  }
  let filteredData = data.filter((data) => data.includes("<"));
  let variableNames: string[] = [];

  filteredData.forEach((line) => {
    variableNames.push(line.split(":")[0].replace("<", ""));
  });
  variableNames = [...new Set(variableNames)];

  let joinFormatedData = [];

  for (let i = 0; i < filteredData.length; i++) {
    let group = [];
    for (let j = 0; j < variableNames.length; j++) {
      if (i + j < filteredData.length) {
        group.push(filteredData[i + j]);
      }
    }
    if (group.length === variableNames.length) {
      joinFormatedData.push(group.join(";"));
    }
    i += variableNames.length - 1;
  }

  const lastItem = joinFormatedData[joinFormatedData.length - 1];
  let result: CardItem[] = [];

  const pairs = lastItem.split(";");
  pairs.forEach((pair) => {
    const match = pair.match(/<([^:]+):(.+)/);
    if (match && variableNames.includes(match[1])) {
      const item: CardItem = {} as CardItem;
      item.title = match[1].toString();
      item.data = parseFloat(match[2]);
      result.push(item);
    }
  });

  return result;
}
export {
  createDataBlob,
  fetchAndReadStreamData,
  filterAndFormatData,
  getGraphData,
  getDownloadData,
  getCardsData,
};
