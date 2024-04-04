import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

export default function FunctionCardExecution(props: {
  titulo: string;
  descripcion: string;

  id: string;
}) {
  const createCommand = useMutation(api.commands.createCommand);
  return (
    <div className="flex w-full items-center justify-between border bg-white p-4 shadow-sm">
      <div className="w-full">
        <h3 className="text-xl font-medium">{props.titulo}</h3>
        <p className="text-sm text-neutral-500">{props.descripcion}</p>
      </div>
      <button
        onClick={() => {
          createCommand({
            deviceFunctionId: props.id as Id<"deviceFunction">,
          });
        }}
        className="flex h-8 w-28 shrink-0 items-center justify-center rounded bg-neutral-900 px-8 py-1 text-sm text-white hover:bg-neutral-800"
      >
        Ejecutar
      </button>
    </div>
  );
}
