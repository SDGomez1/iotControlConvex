import { Card, LineChart } from "@tremor/react";
import { useAppSelector } from "lib/hooks";
import { RootState } from "lib/store";

export default function Graph(props: { id: string }) {
  const getSerialData = useAppSelector((state: RootState) => state.serialData);
  const filteredData = getSerialData.filter((item) => item.id == props.id);
  const formattedData = filteredData.map((item, index) => {
    return {
      index: index,
      value: item.data,
    };
  });

  return (
    <>
      <LineChart data={formattedData} index="index" categories={["value"]} />
      <Card
        className="mx-auto max-w-xs"
        decoration="top"
        decorationColor="indigo"
      >
        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
          Valor Actual
        </p>
        <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong text-3xl font-semibold">
          {formattedData.length > 0
            ? formattedData[formattedData.length - 1].value
            : ""}
        </p>
      </Card>
    </>
  );
}
