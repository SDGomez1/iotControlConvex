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

export { createDataBlob };
