"use client";
import { useRouter } from "next/navigation";

export default function Hero() {
  const router = useRouter();
  return (
    <section className="flex  flex-col items-center justify-center gap-2 px-10 py-4 lg:gap-10 lg:pt-20 dark:bg-dark">
      <h1 className="lg:w-700px text-center text-3xl font-medium lg:text-7xl">
        Conecta tus dispositivos como nunca antes
      </h1>
      <h2 className="lg:w-700px text-lightText mb-4 text-center text-sm font-normal lg:text-xl dark:text-darkText">
        Controla cualquier microcontrolador a través de Internet, sin
        complicaciones. Lleva tus proyectos de a la nube, fácil y rápido.
      </h2>
      <button
        className="w-full rounded bg-accent py-2 text-sm text-white lg:w-96 lg:text-base "
        onClick={() => router.push("/signUp")}
      >
        Crea una cuenta
      </button>
    </section>
  );
}
