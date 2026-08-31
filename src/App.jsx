import { useEffect } from "react";
import NetworkBackground from "./components/NetworkBackground";
import AmbientHUD from "./components/AmbientHUD";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Trajectory from "./components/Trajectory";
import FeaturedWork from "./components/FeaturedWork";
import Gallery from "./components/Gallery";
import Partners from "./components/Partners";
import ImpactProof from "./components/ImpactProof";
import Contact, { Footer } from "./components/Contact";

export default function App() {
  useEffect(() => {
    // Halaman selalu mulai dari paling bawah (Hero) saat pertama dibuka,
    // bukan dari atas (Kontak).
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const goToBottom = () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "auto" });
    };
    goToBottom();
    // Layout (gambar/font) bisa berubah tinggi setelah mount pertama,
    // jadi ulangi sebentar supaya benar-benar mentok di bawah.
    const raf = requestAnimationFrame(goToBottom);
    const t = setTimeout(goToBottom, 150);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      <NetworkBackground />
      <AmbientHUD />
      <Nav />
      <main className="relative z-10">
        <Contact />
        <ImpactProof />
        <FeaturedWork />
        <Gallery />
        <Partners />
        <Trajectory />
        <About />
        <Hero />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
