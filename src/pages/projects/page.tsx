import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/pages/home/components/Navbar";
import Footer from "@/pages/home/components/Footer";
import ProjectsHero from "./components/ProjectsHero";
import ProjectSheet from "@/components/feature/ProjectSheet";
import Reveal from "@/components/base/Reveal";
import { projects } from "@/mocks/projects";

const filters = ["Todas", "Residencial", "Multifamiliar", "Comercial"];
const AUTO_INTERVAL = 5000;

export default function ProjectsPage() {
  const [active, setActive] = useState("Todas");
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const [openProject, setOpenProject] = useState<(typeof projects)[number] | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);

  const list = useMemo(
    () => (active === "Todas" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = filterRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView || openProject) return;
    const id = window.setInterval(() => {
      setActive((curr) => {
        const idx = filters.indexOf(curr);
        return filters[(idx + 1) % filters.length];
      });
      setCycleKey((k) => k + 1);
    }, AUTO_INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, inView, openProject]);

  return (
    <main className="bg-cream text-ink">
      <div className="relative">
        <Navbar variant="dark" />
        <ProjectsHero />
      </div>

      <section id="content" className="bg-cream text-ink py-20 md:py-28 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-end">
          <Reveal animation="fade-up" duration={800} className="md:col-span-7">
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ ARCHIVO ]</span>
            <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,6vw,84px)]">
              Cada proyecto, <em className="italic text-brand">en orden</em>.
            </h2>
          </Reveal>
          <Reveal animation="fade-up" delay={150} duration={900} className="md:col-span-5">
            <p className="text-base md:text-lg text-ink/70 leading-relaxed">
              El índice completo de viviendas, edificios multifamiliares y espacios comerciales
              que hemos proyectado desde 2015. Filtra por tipología o recorre el archivo completo.
            </p>
          </Reveal>
        </div>

        <Reveal animation="fade-up" duration={700}>
          <div
            ref={filterRef}
            className="mt-12 flex flex-wrap gap-2 items-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {filters.map((f) => {
              const isActive = active === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => {
                    setActive(f);
                    setPaused(true);
                  }}
                  className={`relative overflow-hidden px-4 py-2 rounded-full text-xs tracking-[0.18em] font-medium border whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? "bg-ink text-cream border-ink"
                      : "border-ink/20 text-ink hover:border-ink"
                  }`}
                >
                  <span className="relative z-10">{f.toUpperCase()}</span>
                  {isActive && !paused && inView && (
                    <span
                      key={`pp-${cycleKey}-${f}`}
                      className="absolute left-0 bottom-0 h-[2px] w-full bg-clay animate-progress"
                      style={{ animationDuration: `${AUTO_INTERVAL}ms` }}
                    />
                  )}
                </button>
              );
            })}
            <div className="ml-auto font-mono text-xs tracking-[0.2em] text-ink/50 self-center flex items-center gap-2">
              {!paused && inView && (
                <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot" />
              )}
              {list.length} / {projects.length} PROYECTOS
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14" data-product-shop>
          {list.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setOpenProject(p)}
              className="group block text-left cursor-pointer transition-opacity duration-500"
            >
              <div className="relative w-full h-[280px] md:h-[520px] overflow-hidden rounded-lg">
                <img
                  src={p.image}
                  alt={`${p.title}, proyecto arquitectónico de BIM Arquitectura`}
                  title={`${p.title} — arquitectura contemporánea`}
                  className="w-full h-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream/90 text-ink text-[10px] tracking-[0.2em] font-medium">
                  {p.category.toUpperCase()}
                </div>
                <div className="absolute bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full border border-cream/40 text-cream group-hover:bg-brand group-hover:border-brand group-hover:text-cream transition-colors">
                  <i className="ri-arrow-right-up-line"></i>
                </div>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4">
                <div>
                  <div className="font-mono text-xs text-ink/50">
                    {p.index} — {p.year}
                  </div>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl font-medium leading-tight">
                    {p.title}
                  </h3>
                  <div className="mt-1 text-sm text-ink/60">{p.location}</div>
                  <div className="mt-2 text-xs text-ink/50">{p.typology} · {p.surface}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-20 text-center text-ink/50 font-mono text-sm tracking-[0.2em]">
            NO HAY PROYECTOS EN ESTA CATEGORÍA TODAVÍA — VUELVE PRONTO.
          </div>
        )}
      </section>

      <section className="bg-brand text-white py-24 md:py-32 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <Reveal animation="fade-up" duration={900} className="md:col-span-8">
            <span className="font-mono text-xs tracking-[0.25em] text-white/70">[ SIGUIENTE ]</span>
            <h3 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,6vw,84px)]">
              ¿Tienes un proyecto en mente?
            </h3>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white/80 leading-relaxed">
              Aceptamos un número limitado de proyectos cada año. Cuéntanos sobre
              el lugar, el programa y la atmósfera que imaginas.
            </p>
          </Reveal>
          <Reveal animation="fade-up" delay={200} duration={800} className="md:col-span-4 flex md:justify-end">
            <a
              href="/contact"
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-white text-brand text-sm tracking-[0.2em] font-medium cursor-pointer whitespace-nowrap hover:bg-cream transition-colors"
            >
              INICIAR UN PROYECTO
              <i className="ri-arrow-right-line"></i>
            </a>
          </Reveal>
        </div>
      </section>

      {openProject && (
        <ProjectSheet project={openProject} onClose={() => setOpenProject(null)} />
      )}

      <Footer />
    </main>
  );
}