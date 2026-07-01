import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/pages/home/components/Navbar";
import Footer from "@/pages/home/components/Footer";
import JournalHero from "./components/JournalHero";
import Reveal from "@/components/base/Reveal";
import { journal, press } from "@/mocks/projects";

const tags = ["Todas", "Materiales", "Proceso", "Iluminación"];
const AUTO_INTERVAL = 4500;

export default function JournalPage() {
  const [active, setActive] = useState("Todas");
  const [paused, setPaused] = useState(false);
  const [cycleKey, setCycleKey] = useState(0);
  const tagsRef = useRef<HTMLDivElement | null>(null);

  const list = useMemo(
    () => (active === "Todas" ? journal : journal.filter((j) => j.category === active)),
    [active]
  );
  const [feature, ...rest] = list;

  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = tagsRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !inView) return;
    const id = window.setInterval(() => {
      setActive((curr) => {
        const idx = tags.indexOf(curr);
        return tags[(idx + 1) % tags.length];
      });
      setCycleKey((k) => k + 1);
    }, AUTO_INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, inView]);

  return (
    <main className="bg-cream text-ink">
      <div className="relative">
        <Navbar variant="dark" />
        <JournalHero />
      </div>

      <section id="content" className="bg-cream text-ink py-24 md:py-32 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <Reveal animation="fade-up" duration={800} className="md:col-span-7">
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ SALA DE LECTURA ]</span>
            <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,6vw,84px)]">
              Notas desde <em className="italic text-brand">el estudio</em>.
            </h2>
          </Reveal>
          <Reveal animation="fade-up" delay={150} duration={900} className="md:col-span-5">
            <p className="text-base md:text-lg text-ink/70 leading-relaxed">
              Ensayos pausados sobre materiales, luz y el oficio de proyectar bien.
              Escritos por el estudio, para cualquiera con curiosidad por lo que ocurre
              entre el primer croquis y la obra terminada.
            </p>
          </Reveal>
        </div>

        <Reveal animation="fade-up" duration={700}>
          <div
            ref={tagsRef}
            className="mt-12 flex flex-wrap gap-2 items-center"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {tags.map((t) => {
              const isActive = active === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setActive(t);
                    setPaused(true);
                  }}
                  className={`relative overflow-hidden px-4 py-2 rounded-full text-xs tracking-[0.18em] font-medium border whitespace-nowrap cursor-pointer transition-colors ${
                    isActive
                      ? "bg-ink text-cream border-ink"
                      : "border-ink/20 text-ink hover:border-ink"
                  }`}
                >
                  <span className="relative z-10">{t.toUpperCase()}</span>
                  {isActive && !paused && inView && (
                    <span
                      key={`jt-${cycleKey}-${t}`}
                      className="absolute left-0 bottom-0 h-[2px] w-full bg-clay animate-progress"
                      style={{ animationDuration: `${AUTO_INTERVAL}ms` }}
                    />
                  )}
                </button>
              );
            })}
            {!paused && inView && (
              <span className="ml-2 w-1.5 h-1.5 rounded-full bg-brand animate-pulse-dot" />
            )}
          </div>
        </Reveal>

        {feature && (
          <div>
            <article className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 group cursor-pointer">
              <div className="md:col-span-7 relative h-[300px] md:h-[560px] overflow-hidden rounded-lg">
                <img
                  src={feature.image}
                  alt={feature.title}
                  title={feature.title}
                  className="w-full h-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream/90 text-ink text-[10px] tracking-[0.2em] font-medium">
                  {feature.category.toUpperCase()}
                </div>
              </div>
              <div className="md:col-span-5 flex flex-col justify-end">
                <div className="flex items-center gap-3 text-xs text-ink/60 font-mono tracking-wider">
                  <span>{feature.date}</span>
                  <span className="w-1 h-1 rounded-full bg-ink/40"></span>
                  <span>{feature.readTime}</span>
                </div>
                <h3 className="mt-4 font-display text-3xl md:text-5xl font-medium leading-tight group-hover:text-brand transition-colors">
                  {feature.title}
                </h3>
                <p className="mt-6 text-base md:text-lg text-ink/70 leading-relaxed">
                  {feature.excerpt}
                </p>
                <div className="mt-8 inline-flex items-center gap-3 text-sm tracking-[0.2em] font-medium">
                  LEER EL ENSAYO
                  <span className="w-9 h-9 flex items-center justify-center border border-ink/30 rounded-full group-hover:bg-ink group-hover:text-cream transition-colors">
                    <i className="ri-arrow-right-line"></i>
                  </span>
                </div>
              </div>
            </article>
          </div>
        )}

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {rest.map((j) => (
            <article key={j.title} className="group cursor-pointer">
              <div className="relative w-full h-[280px] md:h-[340px] overflow-hidden rounded-lg bg-bone">
                <img
                  src={j.image}
                  alt={j.title}
                  title={j.title}
                  className="w-full h-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-cream/90 text-ink text-[10px] tracking-[0.2em] font-medium">
                  {j.category.toUpperCase()}
                </div>
              </div>
              <div className="mt-5 flex items-center gap-3 text-xs text-ink/60 font-mono tracking-wider">
                <span>{j.date}</span>
                <span className="w-1 h-1 rounded-full bg-ink/40"></span>
                <span>{j.readTime}</span>
              </div>
              <h4 className="mt-3 font-display text-xl md:text-2xl font-medium leading-tight group-hover:text-brand transition-colors">
                {j.title}
              </h4>
              <p className="mt-3 text-sm md:text-base text-ink/70 leading-relaxed">
                {j.excerpt}
              </p>
            </article>
          ))}
        </div>

        {list.length === 0 && (
          <div className="mt-20 text-center text-ink/50 font-mono text-sm tracking-[0.2em]">
            NO HAY ENSAYOS CON ESTA ETIQUETA TODAVÍA.
          </div>
        )}
      </section>

      <section className="bg-bone text-ink py-24 md:py-32 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal animation="fade-up" duration={800} className="md:col-span-4">
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ EN PRENSA ]</span>
            <h3 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(32px,4vw,56px)]">
              Prensa y reconocimientos.
            </h3>
          </Reveal>
          <div className="md:col-span-8">
            <ul className="border-t border-ink/15">
              {press.map((p, i) => (
                <Reveal
                  key={p.title}
                  animation="fade-right"
                  delay={i * 110}
                  duration={800}
                >
                  <div className="flex flex-col sm:grid sm:grid-cols-12 gap-1 sm:gap-4 py-6 border-b border-ink/15 items-start sm:items-baseline">
                    <span className="font-display text-lg md:text-xl font-medium sm:col-span-3 md:col-span-2">
                      {p.source}
                    </span>
                    <span className="text-sm md:text-base text-ink/70 sm:col-span-6 md:col-span-8">
                      {p.title}
                    </span>
                    <span className="text-xs text-ink/50 font-mono tracking-wider whitespace-nowrap sm:col-span-3 md:col-span-2 sm:text-right">
                      {p.date}
                    </span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}