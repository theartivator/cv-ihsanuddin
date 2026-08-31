import SkillConstellation from "./components/SkillConstellation";
import AmbientHUD from "./components/AmbientHUD";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Trajectory from "./components/Trajectory";
import FeaturedWork from "./components/FeaturedWork";
import Skills from "./components/Skills";
import Contact, { Footer } from "./components/Contact";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <SkillConstellation />
      <AmbientHUD />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Trajectory />
        <FeaturedWork />
        <Skills />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
