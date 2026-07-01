import { useEffect, useRef, useState } from "react";
import { services } from "@/mocks/projects";
import Reveal from "@/components/base/Reveal";

const AUTO_INTERVAL = 3000;

export default function Services() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
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
    if (paused || !inView) return;
    const id = window.setInterval(() => {
      setActiveIdx((i) => (i + 1) % services.length);
    }, AUTO_INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, inView]);

  return (
    <section
      ref={sectionRef}
      className="bg-brand-dark text-cream py-24 md:py-32 px-6 md:px-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <Reveal animation="fade-up" duration={800}>
            <span className="font-mono text-xs tracking-[0.25em] text-cream/60">[ 03 / SERVICIOS ]</span>
          </Reveal>
          <Reveal animation="fade-up" delay={150} duration={1000}>
            <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,6vw,84px)]">
              Lo que hacemos.
            </h2>
          </Reveal>
          <Reveal animation="fade-up" delay={300} duration={900}>
            <p className="mt-6 max-w-md text-base text-cream/70 leading-relaxed">
              Cuatro disciplinas, un mismo estudio. Nos movemos entre escalas — desde el detalle constructivo
              hasta el plan maestro — con el mismo nivel de exigencia.
            </p>
          </Reveal>

         
        </div>
        <div
          className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-cream/10 rounded-lg overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {services.map((s, i) => {
            const isActive = i === activeIdx;
            return (
              <Reveal
                key={s.title}
                animation="fade-up"
                delay={i * 140}
                duration={800}
                className={`relative bg-brand-dark p-8 md:p-10 hover:bg-brand transition-colors duration-500 group cursor-pointer ${
                  isActive ? "bg-brand" : ""
                }`}
              >
                <div onClick={() => setActiveIdx(i)} className="h-full">
                  <div className="w-12 h-12 flex items-center justify-center text-3xl text-cream/90">
                    <i className={s.icon}></i>
                  </div>
                  <h3 className="mt-8 font-display text-2xl md:text-3xl font-medium">{s.title}</h3>
                  <p
                    className={`mt-4 text-sm md:text-base leading-relaxed transition-colors ${
                      isActive ? "text-cream/90" : "text-cream/70 group-hover:text-cream/90"
                    }`}
                  >
                    {s.description}
                  </p>
              

                  {isActive && !paused && inView && (
                    <span
                      key={`svc-pg-${activeIdx}-${i}`}
                      className="absolute left-0 bottom-0 h-[2px] w-full bg-cream/70 animate-progress"
                      style={{ animationDuration: `${AUTO_INTERVAL}ms` }}
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}