import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Intro from "./components/Intro";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Process from "./components/Process";
import Team from "./components/Team";
import Journal from "./components/Journal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-cream text-ink">
      <div className="relative">
        <Navbar />
        <Hero />
      </div>
      <Intro />
      <Projects />
      <Services />
      <Process />
      <Team />
      <Journal />
      <Contact />
      <Footer />
    </main>
  );
}