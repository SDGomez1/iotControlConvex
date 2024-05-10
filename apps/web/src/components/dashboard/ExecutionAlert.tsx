import { Doc } from "convex/_generated/dataModel";
import { Dispatch, SetStateAction, useState } from "react";
import { typeOfFormat } from "types/deviceFunctionClientData";

export default function ExecutionAlert(props: {
  setSendConfirmation: Dispatch<SetStateAction<boolean>>;
  functionData: Doc<"deviceFunction">;
}) {
  const [value, setValue] = useState(0); // Initialize state with the default value
  const min = 1; // Minimum value
  const max = 10; // Maximum value

  const [reactNode, setReacNode] = useState(<></>);
  if (props.functionData.format === typeOfFormat.interval) {
    const newReactNode = (
      <input
        type="number"
        value={value}
        onChange={(event) => {
          const newValue = Math.max(
            min,
            Math.min(max, Number(event.target.value)),
          );
          setValue(newValue);
        }}
      />
    );
  }

  if (props.functionData.format === typeOfFormat.scale) {
  }

  return (
    <span
      className={`fixed left-0 top-0 z-10 flex h-screen w-screen items-center justify-center bg-black/15 px-4 transition-all dark:bg-black/65`}
    >
      <div className="flex h-1/2 w-screen flex-col items-center justify-center rounded-lg bg-white dark:bg-dark">
        <p>Esta función requiere información adicional</p>
        <p className="mb-2"> {props.functionData.message}</p>
        <form></form>
        <div className="flex gap-2">
          <button
            onClick={() => {
              props.setSendConfirmation(false);
            }}
            className="rounded-sm border border-danger p-2 text-sm text-danger  "
          >
            Cancelar
          </button>
          <button
            onClick={() => {}}
            className="rounded border bg-accent p-2 text-sm text-white"
          >
            Ejecutar
          </button>
        </div>
      </div>
    </span>
  );
}
