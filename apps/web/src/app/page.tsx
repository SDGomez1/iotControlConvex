import Hero from "components/landingPage/Hero";
import Navbar from "components/landingPage/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen dark:bg-dark">
      <Navbar />
      <Hero />
    </main>
  );
}
