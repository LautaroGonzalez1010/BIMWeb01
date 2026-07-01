import { useState, useEffect, useRef } from "react";
import Reveal from "@/components/base/Reveal";
import logo from "@/img/IMG1HERO.png";
import logo2 from "@/img/IMG2HERO.png";
import logo3 from "@/img/IMG3HERO.png";
import logo4 from "@/img/IMG4HERO.png";

const featured = [
  {
    caption: "DESTACADO — EDIFICIO 156 / BERAZATEGUI / 2024",
    image: logo,
    alt: "Edificio 156, edificio residencial contemporáneo en Berazategui por BIM Arquitectura",
  },
  {
    caption: "DESTACADO — CASA BOSQUE / FLORENCIO VARELA / 2024",
    image: logo2,
    alt: "Casa Bosque, vivienda unifamiliar contemporánea en Florencio Varela por BIM Arquitectura",
  },
  {
    caption: "DESTACADO — EDIFICIO HORIZONTE / BERAZATEGUI / 2022",
    image: logo3,
    alt: "Edificio Horizonte, edificio multifamiliar contemporáneo en Berazategui por BIM Arquitectura",
  },
  {
    caption: "DESTACADO — REFORMA CENTRO COMERCIAL / BERAZATEGUI / 2023",
    image: logo4,
    alt: "Reforma Centro Comercial, remodelación comercial en Berazategui por BIM Arquitectura",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % featured.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      id="top"
      className="relative bg-brand text-white overflow-hidden min-h-screen flex flex-col"
    >
      {/* Dotted blueprint backdrop */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />

      <div className="relative pt-24 md:pt-32 px-5 md:px-10 shrink-0">
        <Reveal animation="fade-down" duration={700}>
          <div className="flex items-start justify-between gap-4">
       
     
          </div>
        </Reveal>
<Reveal animation="fade-up" delay={120} duration={1100}>
  <div className="flex flex-col items-center text-center">
    <h1 className="mt-2 font-display font-medium leading-[0.85] tracking-tight text-[clamp(60px,16vw,240px)]">
      BIM
    </h1>

    <div className="mt-2 font-mono text-xs md:text-sm tracking-[0.35em] text-white/70">
      ARQUITECTURA & DESARROLLO
    </div>
  </div>
</Reveal>

        {/* Ruler dimension line under headline */}
        <Reveal animation="fade-in" delay={420} duration={900}>
          <div className="mt-3 md:mt-4 flex items-center gap-3 text-white/70">
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em]">↤</span>
            <div className="flex-1 h-px ruler-ticks text-white/40"></div>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.25em]">↦</span>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-4 md:mt-8 px-5 md:px-10 pb-6 md:pb-10 flex-1 flex flex-col min-h-0">
        <Reveal
          animation="clip-up"
          delay={300}
          duration={1200}
          className="relative w-full flex-1 min-h-[260px] md:min-h-[360px] overflow-hidden rounded-md"
        >
          {/* Vertical sliding stack */}
          <div
            ref={containerRef}
            className="absolute inset-0"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className="absolute inset-x-0 top-0 will-change-transform"
              style={{
                height: `${featured.length * 100}%`,
                transform: `translateY(-${activeIndex * (100 / featured.length)}%)`,
                transition: "transform 1200ms cubic-bezier(0.77, 0, 0.18, 1)",
              }}
            >
              {featured.map((item, i) => (
                <div
                  key={item.caption}
                  className="relative w-full overflow-hidden"
                  style={{ height: `${100 / featured.length}%` }}
                >
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className={`absolute inset-0 w-full h-full object-cover object-center transition-transform duration-[6000ms] ease-out ${
                      i === activeIndex ? "scale-105" : "scale-100"
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Subtle bottom gradient for caption legibility */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />

            {/* Vertical indicator (right side) */}
            <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3">
              {featured.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={item.caption}
                    type="button"
                    aria-label={`Ver proyecto destacado ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    className="group flex items-center gap-2 cursor-pointer"
                  >
                    <span
                      className={`font-mono text-[10px] tracking-[0.25em] transition-all duration-500 ${
                        isActive ? "text-white opacity-100" : "text-white/0 opacity-0 group-hover:text-white/70 group-hover:opacity-100"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`block rounded-full transition-all duration-500 ${
                        isActive
                          ? "w-1.5 h-8 bg-white"
                          : "w-1.5 h-1.5 bg-white/40 group-hover:bg-white/70"
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Progress bar (bottom) */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-white/15">
              <div
                key={`${activeIndex}-${paused}`}
                className="h-full bg-clay"
                style={{
                  animation: paused
                    ? "none"
                    : "heroProgress 4200ms linear forwards",
                }}
              />
            </div>

          </div>
        </Reveal>

        <Reveal animation="fade-up" delay={500} duration={800}>
          <div className="mt-5 flex flex-col md:flex-row md:items-end md:justify-between gap-4 shrink-0">
            <div className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/70 flex items-center gap-3 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-clay animate-pulse-dot shrink-0" />
              <span
                key={activeIndex}
                className="inline-block truncate"
                style={{
                  animation: "fadeUp 600ms cubic-bezier(0.22, 0.61, 0.36, 1) both",
                }}
              >
                {featured[activeIndex].caption}
              </span>
            </div>
            <a
              href="#projects"
              className="inline-flex items-center gap-3 text-sm tracking-[0.2em] font-medium cursor-pointer whitespace-nowrap group"
            >
              VER PROYECTOS
              <span className="w-9 h-9 flex items-center justify-center border border-white/40 rounded-full group-hover:bg-white group-hover:text-brand transition-colors">
                <i className="ri-arrow-right-line"></i>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}