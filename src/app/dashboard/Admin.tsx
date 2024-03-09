"use client";

import Card from "components/dashboard/card";
import Navbar from "components/dashboard/navbar";
import style from "styles/dashboard/admin.module.css";

export default function Admin() {
  return (
    <main className={style.container}>
      <Navbar />
      <section className={style.mainSection}>
        <h2>Conectar un dispositvo</h2>
        <div>
          <Card />
        </div>
      </section>
    </main>
  );
}
