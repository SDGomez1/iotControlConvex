import Link from "next/link";
import styles from "styles/components/card.module.css";
export default function Card(props: {
  titulo: string;
  descripcion: string;
  url: string;
}) {
  return (
    <div className={styles.container}>
      <div>
        <h3>{props.titulo}</h3>
        <p> {props.descripcion}</p>
      </div>

      <Link href={props.url}>
        <button> Conectar →</button>
      </Link>
    </div>
  );
}
