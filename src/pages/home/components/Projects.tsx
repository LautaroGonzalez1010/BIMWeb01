import { useEffect, useRef, useState } from "react";
import { projects } from "@/mocks/projects";
import ProjectSheet from "@/components/feature/ProjectSheet";
import Reveal from "@/components/base/Reveal";

const filters = ["Todas", "Residencial", "Multifamiliar", "Comercial"];
const AUTO_INTERVAL = 4200;

const scopeByCategory: Record<string, string> = {
  Residencial: "Vivienda unifamiliar",
  Multifamiliar: "Edificio multifamiliar",
  Comercial: "Local comercial/oficinas",
};

type Project = (typeof projects)[number];

export default function Projects() {
  const [active, setActive] = useState("Todas");
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [openProject, setOpenProject] = useState<Project | null>(null);

  const list = (active === "Todas" ? projects : projects.filter((p) => p.category === active)).slice(0, 4);
  const sectionRef = useRef<HTMLElement | null>(null);

  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
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

  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      e.preventDefault();
      setActive((curr) => {
        const idx = filters.indexOf(curr);
        const next = e.key === "ArrowRight" ? idx + 1 : idx - 1 + filters.length;
        return filters[next % filters.length];
      });
      setPaused(true);
      setCycleKey((k) => k + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView]);

  const handleManualSelect = (f: string) => {
    setActive(f);
    setPaused(true);
    setCycleKey((k) => k + 1);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="bg-bone text-ink px-4 md:px-6 lg:px-10 py-10 md:py-12 lg:h-screen lg:flex lg:flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Reveal animation="fade-up" duration={800}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 shrink-0">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ 02 / OBRA ]</span>
            <h2 className="mt-3 font-display font-medium leading-[0.95] text-[clamp(32px,4.5vw,64px)]">
              Proyectos seleccionados
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <div className="flex flex-wrap gap-2 items-center">
              {filters.map((f) => {
                const isActive = active === f;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => handleManualSelect(f)}
                    className={`relative overflow-hidden px-3 md:px-4 py-2 rounded-full text-[11px] md:text-xs tracking-[0.18em] font-medium border whitespace-nowrap cursor-pointer transition-colors ${
                      isActive
                        ? "bg-ink text-cream border-ink"
                        : "border-ink/20 text-ink hover:border-ink"
                    }`}
                  >
                    <span className="relative z-10">{f.toUpperCase()}</span>
                    {isActive && !paused && inView && !openProject && (
                      <span
                        key={`pg-${cycleKey}-${f}`}
                        className="absolute left-0 bottom-0 h-[2px] w-full bg-clay animate-progress"
                        style={{ animationDuration: `${AUTO_INTERVAL}ms` }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>

      <div
        className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 flex-1 min-h-0"
        data-product-shop
        onMouseLeave={() => setHoveredId(null)}
      >
        {list.map((p) => {
          const isHovered = hoveredId === p.id;
          const someoneElseHovered = hoveredId !== null && !isHovered;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setOpenProject(p)}
              onMouseEnter={() => setHoveredId(p.id)}
              onFocus={() => setHoveredId(p.id)}
              className={`group relative text-left flex flex-col cursor-pointer min-h-0 h-full transition-all duration-500 ${
                someoneElseHovered ? "opacity-50" : "opacity-100"
              } ${isHovered ? "-translate-y-1" : ""}`}
            >
              <div className="relative w-full flex-1 min-h-[180px] sm:min-h-[200px] overflow-hidden rounded-md bg-ink/5">
                <img
                  src={p.image}
                  alt={`${p.title}, proyecto arquitectónico de BIM Arquitectura`}
                  title={`${p.title} — arquitectura contemporánea`}
                  className={`w-full h-full object-cover object-top transition-transform duration-[1400ms] ease-out ${
                    isHovered ? "scale-110" : "scale-100"
                  }`}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cream/90 text-ink text-[10px] tracking-[0.2em] font-medium">
                  {p.category.toUpperCase()}
                </div>

                <div
                  className={`absolute inset-x-0 bottom-0 bg-ink/85 text-cream backdrop-blur-sm transition-all duration-500 ease-out ${
                    isHovered
                      ? "translate-y-0 opacity-100"
                      : "translate-y-full opacity-0"
                  }`}
                >
                  <div className="px-3.5 py-3 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-mono text-[9px] tracking-[0.25em] text-cream/60">
                        TIPOLOGÍA
                      </div>
                      <div className="mt-0.5 text-[11px] truncate">
                        {scopeByCategory[p.category] ?? "Proyecto arquitectónico"}
                      </div>
                    </div>
                    <span className="shrink-0 inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] font-medium">
                      FICHA
                      <i className="ri-arrow-right-up-line"></i>
                    </span>
                  </div>
                </div>

                <div
                  className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)",
                  }}
                />
              </div>

              <div className="mt-3 flex items-start justify-between gap-3 shrink-0">
                <div className="min-w-0">
                  <div className="font-mono text-[11px] text-ink/50">
                    {p.index} — {p.year}
                  </div>
                  <h3 className="mt-1 font-display text-base sm:text-lg md:text-xl font-medium leading-tight truncate">
                    {p.title}
                  </h3>
                  <div className="mt-0.5 text-xs text-ink/60 truncate">{p.location}</div>
                </div>
                <span
                  className={`shrink-0 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full border transition-all duration-300 ${
                    isHovered
                      ? "bg-brand text-cream border-brand rotate-45"
                      : "border-ink/20 text-ink"
                  }`}
                >
                  <i className="ri-arrow-right-up-line text-sm md:text-base"></i>
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {openProject && (
        <ProjectSheet project={openProject} onClose={() => setOpenProject(null)} />
      )}
    </section>
  );
}