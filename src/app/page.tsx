"use client";
import Footer from "components/common/Footer";
import Card from "components/landingPage/Card";
import Navbar from "components/landingPage/Navbar";
import { useRouter } from "next/navigation";
import microcontroller from "img/Microcontrollers.svg";

export default function Home() {
  const router = useRouter();
  return (
    <main className="">
      <Navbar />
      <section className="h-70vh bg-hero-pattern flex flex-col items-center justify-center px-4">
        <h1 className="border border-dotted p-5 text-center text-2xl font-semibold lg:w-1/2 lg:text-5xl">
          Conecta y gestiona tus dispositivos como nunca antes.
        </h1>
        <h2 className="border border-dotted p-5 text-center text-sm  text-neutral-500 lg:w-1/2 lg:text-xl">
          Controla cualquier microcontrolador a través de Internet, sin
          complicaciones. Lleva tus proyectos de a la nube, fácil y rápido.
        </h2>
        <button
          onClick={() => router.push("")}
          className="mt-6 w-2/3 rounded bg-neutral-900 py-2 text-sm text-white lg:mt-8 lg:w-52 lg:text-base"
        >
          Comienza Ahora
        </button>
      </section>
      <section className="flex w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-2 px-6 text-center text-xl lg:flex-row">
          <h3 className="font-bold lg:text-2xl"> ¿Que es nombre?</h3>
          <p className="text-sm text-neutral-500 lg:text-xl">
            Conecta y controla microcontroladores por internet fácilmente.
          </p>
        </div>
        <div className="flex w-full auto-rows-auto grid-cols-3 flex-col items-center justify-items-center gap-10 px-10 py-10 lg:grid lg:px-40">
          <Card
            imageUrl={microcontroller}
            title="Conexión Flexible"
            text="Soporte para la mayoría de microcontroladores comerciales "
          />
          <Card
            imageUrl=""
            title="Envio de datos en tiempo real"
            text="Ten la opcion de enviar y recibir los datos de tus microcontroladores en tiempo real"
          />
          <Card
            imageUrl=""
            title="Funciones personalizadas"
            text="Personaliza las funciones de tus dispositivos segun tus necesidades, configura cada detalle de su ejecucion"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
}
