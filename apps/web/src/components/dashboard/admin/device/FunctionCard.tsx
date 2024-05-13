import ExecutionAlert from "components/dashboard/ExecutionAlert";
import { Doc } from "convex/_generated/dataModel";
import { useState } from "react";
import { writeToPort } from "utils/serialUtils";

export default function FunctionCard(props: {
  functionData: Doc<"deviceFunction">;
  serialPort: SerialPort | undefined;
}) {
  const [sendConfirmation, setSendConfirmation] = useState(false);

  return (
    <div className="dark:border-darkTex  flex w-full shrink-0 flex-col gap-2 rounded border border-lightText p-4 lg:h-40 2xl:h-44 2xl:w-full">
      <h2 className="text-sm font-bold 2xl:text-xl">
        {props.functionData.name}
      </h2>
      <p className="line-clamp-3 shrink-0 text-xs text-lightText 2xl:text-base dark:text-darkText">
        {props.functionData.description}
      </p>
      <span className="flex h-full items-end justify-end">
        <button
          onClick={() => {
            if (props.functionData.userInfo) {
              setSendConfirmation(true);
            } else {
              writeToPort(props.serialPort, props.functionData.command);
            }
          }}
          className={`self-end rounded  p-2 text-sm  text-white ${props.serialPort ? "bg-accent " : "bg-neutral-300 dark:bg-neutral-400 dark:text-neutral-800"}`}
          disabled={props.serialPort ? false : true}
        >
          {props.serialPort ? "Ejecutar localmente" : "Dispostivo no conectado"}
        </button>
      </span>

      {sendConfirmation ? (
        <ExecutionAlert
          setSendConfirmation={setSendConfirmation}
          functionData={props.functionData}
          serialPort={props.serialPort}
          isAdmin={true}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
