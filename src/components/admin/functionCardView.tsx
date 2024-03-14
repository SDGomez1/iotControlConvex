import style from "styles/components/admin/functionCard.module.css";

export default function FunctionCardView(props: {
  titulo: string;
  descripcion: string;
}) {
  return (
    <div className={style.functionContainer}>
      <h3>{props.titulo}</h3>
      <p>{props.descripcion}</p>
    </div>
  );
}
