import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation } from "convex/react";

export default function FunctionCardExecution(props: {
  name: string;
  description: string;
  id: string;
}) {
  const createCommand = useMutation(api.command.createCommand);
  return (
    <div className="flex  w-full shrink-0 flex-col gap-2 rounded border border-lightText p-4 lg:h-40 2xl:h-44 2xl:w-full dark:border-darkText">
      <h2 className="text-sm font-bold 2xl:text-xl">{props.name}</h2>
      <p className="line-clamp-3 shrink-0 text-xs text-lightText 2xl:text-base dark:text-darkText">
        {props.description}
      </p>
      <span className="flex h-full items-end justify-end">
        <button
          onClick={() => {
            createCommand({
              deviceFunctionId: props.id as Id<"deviceFunction">,
            });
          }}
          className="self-end rounded bg-accent p-2 text-sm text-white"
        >
          Ejecutar
        </button>
      </span>
    </div>
  );
}
