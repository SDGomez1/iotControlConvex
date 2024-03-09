import styles from "styles/components/card.module.css";
export default function Card() {
  return (
    <div className={styles.container}>
      <div>
        <h3>Bomba de microfluidos</h3>
        <p> Controla flujos de alrededor 50uL en adelante</p>
      </div>

      <button> Conectar →</button>
    </div>
  );
}
