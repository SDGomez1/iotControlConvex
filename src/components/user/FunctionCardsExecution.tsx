import { api } from "convex/_generated/api";
import { Id } from "convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import style from "styles/components/user/functionCardExecution.module.css";

export default function FunctionCardExecution(props: {
  titulo: string;
  descripcion: string;

  id: string;
}) {
  const createCommand = useMutation(api.commands.createCommand);
  return (
    <div className={style.functionContainer}>
      <div>
        <h3>{props.titulo}</h3>
        <p>{props.descripcion}</p>
      </div>
      <button
        onClick={() => {
          createCommand({
            deviceFunctionId: props.id as Id<"deviceFunction">,
          });
        }}
      >
        Ejecutar
      </button>
    </div>
  );
}
