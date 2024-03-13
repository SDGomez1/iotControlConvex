import { Dispatch, SetStateAction, useState } from "react";
import style from "styles/components/admin/functionCard.module.css";

export default function FunctionCard(props: {
  isEditing: boolean;
  index: number;
  isCreating: Dispatch<SetStateAction<boolean>>;
  setCurrentIndex: Dispatch<SetStateAction<number>>;
}) {
  const [savedState, setSavedState] = useState(false);

  if (props.isEditing) {
    return (
      <div className={style.functionContainer}>
        <input
          placeholder="Nombre de la funcion"
          name={`nombreF${props.index}`}
        />
        <h3> Informacion general</h3>
        <input placeholder="Descripcion" name={`descripcionF${props.index}`} />
        <h3>Inputs</h3>
        <input
          placeholder="Comando de ejecucion"
          name={`comando${props.index}`}
        />
        {savedState ? (
          <div className={style.buttonContainer}>
            <button
              type="button"
              onClick={() => {
                setSavedState(false);
                props.isCreating(true);
              }}
            >
              Editar
            </button>
            <button
              type="button"
              onClick={() => {
                props.setCurrentIndex(props.index);
              }}
            >
              Borrar
            </button>
          </div>
        ) : (
          <>
            <div className={style.buttonContainer}>
              <button
                type="button"
                onClick={() => {
                  setSavedState(true);
                  props.isCreating(false);
                }}
              >
                Crear
              </button>
              <button type="button" onClick={() => {}}>
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    );
  } else {
    return <></>;
  }
}
