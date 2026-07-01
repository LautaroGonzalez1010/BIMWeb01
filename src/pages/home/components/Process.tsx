import { useEffect, useRef, useState, useCallback } from "react";
import Reveal from "@/components/base/Reveal";

const phases = [
  {
    code: "FA-01",
    title: "Primera Reunión",
    icon: "ri-chat-3-line",
    weeks: "SEM 01 — 02",
    duration: "2 semanas",
    text: "Conversación inicial, visita al emplazamiento, programa de necesidades y primeras impresiones del lugar y el paisaje.",
    image:
      "https://readdy.ai/api/search-image?query=Minimal%20architectural%20consultation%20scene%20with%20natural%20daylight%20and%20soft%20shadows%2C%20two%20professionals%20at%20a%20clean%20wooden%20table%20reviewing%20site%20plans%2C%20warm%20grey%20and%20cream%20tones%2C%20simple%20uncluttered%20background%2C%20editorial%20photography%20with%20refined%20composition%2C%20high%20end%20architecture%20firm%20aesthetic%2C%20soft%20diffused%20window%20light&width=900&height=600&seq=process-v2-01&orientation=landscape",
  },
  {
    code: "FA-02",
    title: "Conceptualización",
    icon: "ri-lightbulb-line",
    weeks: "SEM 03 — 06",
    duration: "4 semanas",
    text: "Desarrollo de la idea, croquis a mano alzada, maqueta de estudio y decisiones sobre materiales y geometría.",
    image:
      "https://readdy.ai/api/search-image?query=Clean%20architectural%20studio%20desk%20with%20hand%20drawn%20sketches%20on%20tracing%20paper%20and%20a%20white%20study%20model%2C%20warm%20natural%20light%20from%20large%20window%2C%20soft%20grey%20and%20cream%20palette%2C%20minimal%20editorial%20interior%20photography%2C%20refined%20composition%2C%20high%20end%20architecture%20firm%20aesthetic%2C%20subtle%20textures&width=900&height=600&seq=process-v2-02&orientation=landscape",
  },
  {
    code: "FA-03",
    title: "Anteproyecto",
    icon: "ri-draft-line",
    weeks: "SEM 07 — 12",
    duration: "6 semanas",
    text: "Planimetría general, volumetría definitiva, estudio solar, selección de materiales y primera estimación económica.",
    image:
      "https://readdy.ai/api/search-image?query=Architectural%20floor%20plan%20drawings%20spread%20across%20a%20large%20wooden%20drafting%20table%2C%20material%20samples%20of%20concrete%20brick%20and%20wood%20arranged%20neatly%20beside%20the%20drawings%2C%20soft%20natural%20daylight%2C%20warm%20earth%20tones%2C%20clean%20editorial%20composition%2C%20high%20end%20architecture%20studio%20photography%2C%20refined%20minimal%20background&width=900&height=600&seq=process-v2-03&orientation=landscape",
  },
  {
    code: "FA-04",
    title: "Proyecto Ejecutivo",
    icon: "ri-ruler-line",
    weeks: "SEM 13 — 20",
    duration: "8 semanas",
    text: "Planos de ejecución, detalles constructivos a escala real, cálculos estructurales, instalaciones y documentación técnica completa.",
    image:
      "https://readdy.ai/api/search-image?query=Detailed%20architectural%20construction%20blueprints%20and%20technical%20drawings%20layered%20on%20a%20desk%2C%20metal%20ruler%20and%20scale%20rule%2C%20warm%20desk%20lamp%20light%2C%20close%20up%20detail%20shot%2C%20editorial%20architectural%20photography%2C%20warm%20grey%20tones%2C%20simple%20dark%20wooden%20surface%2C%20refined%20composition%2C%20precise%20technical%20mood&width=900&height=600&seq=process-v2-04&orientation=landscape",
  },
  {
    code: "FA-05",
    title: "Construcción",
    icon: "ri-building-4-line",
    weeks: "SEM 21 — 48",
    duration: "28 semanas",
    text: "Dirección de obra, coordinación de oficios, control de calidad y visitas semanales para asegurar que cada detalle se ejecuta según lo proyectado.",
    image:
      "https://readdy.ai/api/search-image?query=Contemporary%20building%20under%20construction%20in%20suburban%20setting%2C%20exposed%20concrete%20structure%20and%20brick%20walls%20in%20progress%2C%20warm%20afternoon%20sunlight%20casting%20long%20shadows%2C%20editorial%20architecture%20photography%2C%20clean%20composition%2C%20warm%20earth%20tones%2C%20simple%20sky%20background%2C%20refined%20high%20end%20construction%20site%20aesthetic%2C%20honest%20raw%20texture&width=900&height=600&seq=process-v2-05&orientation=landscape",
  },
  {
    code: "FA-06",
    title: "Entrega Final",
    icon: "ri-key-2-line",
    weeks: "SEM 49 — 52",
    duration: "4 semanas",
    text: "Revisión final, manual de mantenimiento, documentación fotográfica de obra terminada y entrega de llaves al cliente con un recorrido guiado por el proyecto.",
    image:
      "https://readdy.ai/api/search-image?query=Modern%20minimalist%20house%20interior%20bathed%20in%20warm%20natural%20daylight%2C%20polished%20concrete%20floors%2C%20clean%20white%20walls%2C%20a%20single%20elegant%20key%20set%20on%20a%20wooden%20entry%20console%2C%20editorial%20architecture%20photography%2C%20warm%20cream%20and%20grey%20tones%2C%20simple%20clean%20background%2C%20refined%20composition%2C%20serene%20complete%20atmosphere%2C%20high%20end%20portfolio%20aesthetic&width=900&height=600&seq=process-v2-06&orientation=landscape",
  },
];

const AUTO_INTERVAL = 2800;

export default function Process() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [nextIdx, setNextIdx] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => {
        const next = (i + 1) % phases.length;
        setNextIdx(next);
        return next;
      });
    }, AUTO_INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, inView]);

  useEffect(() => {
    if (nextIdx === null) return;
    const t = setTimeout(() => setNextIdx(null), 500);
    return () => clearTimeout(t);
  }, [nextIdx]);

  const handlePhaseClick = useCallback(
    (i: number) => {
      if (i === activeIdx) return;
      setNextIdx(i);
      setActiveIdx(i);
    },
    [activeIdx]
  );

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream text-ink py-24 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      {/* Blueprint grid */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-40 pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Header */}
        <Reveal animation="fade-up" duration={800}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 md:mb-20">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-ink/50">
                [ 03.5 / PROCESO ]
              </span>
              <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,6vw,84px)]">
                Del <em className="italic text-brand">boceto</em> a la entrega de llaves.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-ink/60 leading-relaxed">
              Un proyecto típico de BIM Arquitectura se desarrolla en seis fases a lo largo de
              aproximadamente un año. Un interlocutor único, visitas semanales a obra y
              control integral de calidad en cada etapa.
            </p>
          </div>
        </Reveal>

        {/* Cards Grid */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {phases.map((p, i) => {
              const isActive = i === activeIdx;
              const isNext = i === nextIdx;
              return (
                <Reveal
                  key={p.code}
                  animation="fade-up"
                  delay={i * 80}
                  duration={800}
                >
                  <button
                    onClick={() => handlePhaseClick(i)}
                    className={`relative w-full text-left group cursor-pointer transition-all duration-500 ${
                      isActive
                        ? "ring-1 ring-brand/20 bg-white/70"
                        : "bg-white/30 hover:bg-white/55 ring-1 ring-ink/8 hover:ring-ink/15"
                    }`}
                  >
                    {/* Image thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-bone/40">
                      <img
                        src={p.image}
                        alt={p.title}
                        className={`w-full h-full object-cover transition-all duration-1000 ${
                          isActive
                            ? "brightness-100 saturate-100"
                            : "brightness-[0.92] saturate-[0.85] group-hover:brightness-100 group-hover:saturate-100"
                        }`}
                      />

                      {/* Progress bar on active card */}
                      {isActive && inView && (
                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand/20">
                          <div
                            key={`pb-${activeIdx}`}
                            className="h-full bg-brand animate-progress"
                            style={{
                              animationDuration: `${AUTO_INTERVAL}ms`,
                            }}
                          />
                        </div>
                      )}

                      {/* Active dot indicator */}
                      {isActive && (
                        <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-brand animate-pulse-dot" />
                      )}
                    </div>

                    {/* Card body */}
                    <div className="p-5 md:p-6">
                      {/* Phase number + icon */}
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`w-10 h-10 rounded-md flex items-center justify-center text-lg transition-all duration-500 ${
                            isActive
                              ? "bg-brand text-cream"
                              : "bg-ink/8 text-ink/40 group-hover:text-ink/60"
                          }`}
                        >
                          <i className={p.icon}></i>
                        </span>
                        <span className="font-display text-3xl font-medium tracking-[-0.04em] text-ink/85">
                          {(i + 1).toString().padStart(2, "0")}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`font-display text-base md:text-lg font-medium leading-tight transition-colors duration-500 ${
                          isActive ? "text-ink" : "text-ink/70 group-hover:text-ink/85"
                        }`}
                      >
                        {p.title}
                      </h3>

                      {/* Duration */}
                      <span className="inline-block mt-2 font-mono text-[11px] tracking-[0.12em] text-brand/60">
                        {p.weeks}
                      </span>

                      {/* Description */}
                      <p className="mt-3 text-sm text-ink/55 leading-relaxed">
                        {p.text}
                      </p>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Collaborators strip */}
<Reveal animation="fade-up" delay={300} duration={800}>
  <div className="mt-16 md:mt-20 border-t border-ink/10 pt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.22em] text-ink/45 text-center">
    <span className="text-ink/70 font-medium">COLABORADORES —</span>

    <span className="flex items-center gap-2">
      <i className="ri-government-line text-brand/60"></i>APAREJADOR
    </span>

    <span className="flex items-center gap-2">
      <i className="ri-calculator-line text-brand/60"></i>ESTRUCTURISTA
    </span>

    <span className="flex items-center gap-2">
      <i className="ri-flashlight-line text-brand/60"></i>INSTALACIONES
    </span>

    <span className="flex items-center gap-2">
      <i className="ri-leaf-line text-brand/60"></i>PAISAJISTA
    </span>

    <span className="flex items-center gap-2">
      <i className="ri-drop-line text-brand/60"></i>ACÚSTICO
    </span>

    <span className="flex items-center gap-2">
      <i className="ri-lightbulb-line text-brand/60"></i>ILUMINACIÓN
    </span>

    <span className="flex items-center gap-2">
      <i className="ri-stack-line text-brand/60"></i>CANTERO
    </span>
  </div>
</Reveal>
      </div>
    </section>
  );
}