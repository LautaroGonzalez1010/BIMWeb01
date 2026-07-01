import { journal, press } from "@/mocks/projects";
import Reveal from "@/components/base/Reveal";

export default function Journal() {
  return (
    <section
      id="journal"
      className="bg-bone text-ink px-4 md:px-6 lg:px-10 py-10 md:py-12 lg:h-screen"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:h-full">
        <div className="lg:col-span-4 flex flex-col lg:h-full">
          <Reveal animation="fade-up" duration={800}>
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">
              [ 05 / BLOG ]
            </span>
          </Reveal>
          <Reveal animation="fade-up" delay={150} duration={900}>
            <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,5vw,72px)]">
              Notas del estudio.
            </h2>
          </Reveal>
          <Reveal animation="fade-up" delay={300} duration={900}>
            <p className="mt-6 max-w-sm text-sm md:text-base text-ink/70 leading-relaxed">
              Ensayos, imágenes de referencia y notas de campo sobre materiales, luz y
              el oficio de proyectar con rigor.
            </p>
          </Reveal>

          <div className="mt-auto pt-10">
            <Reveal animation="fade-up" delay={150} duration={900}>
              <div className="border-t border-ink/15 pt-6">
                <div className="text-xs tracking-[0.25em] text-ink/50 font-mono mb-4">
                  [ EN PRENSA ]
                </div>
                <ul className="space-y-3">
                  {press.map((p, i) => (
                    <li
                      key={p.title}
                      className="flex items-baseline justify-between gap-3 text-sm"
                      style={{
                        opacity: 0,
                        animation: `fadeUp 700ms cubic-bezier(0.22,0.61,0.36,1) ${
                          200 + i * 120
                        }ms forwards`,
                      }}
                    >
                      <span className="font-medium">{p.source}</span>
                      <span className="flex-1 border-b border-dotted border-ink/20 translate-y-[-3px]" />
                      <span className="text-ink/60 text-xs whitespace-nowrap">
                        {p.date}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8 lg:h-full lg:min-h-0">
          <div className="lg:h-full lg:overflow-y-auto lg:pr-3 journal-scroll">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {journal.map((j, i) => (
                <Reveal
                  key={j.title}
                  animation="fade-up"
                  delay={i * 130}
                  duration={900}
                  className={`${i === 0 ? "sm:col-span-2" : ""}`}
                >
                  <article className="group cursor-pointer">
                    <div
                      className={`relative w-full overflow-hidden rounded-lg bg-cream ${
                        i === 0
                          ? "h-[220px] sm:h-[280px] lg:h-[340px]"
                          : "h-[200px] sm:h-[240px] lg:h-[260px]"
                      }`}
                    >
                      <img
                        src={j.image}
                        alt={`${j.title} — artículo del blog`}
                        title={j.title}
                        className="w-full h-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-3 text-xs text-ink/60 font-mono tracking-wider">
                      <span>{j.date}</span>
                      <span className="w-1 h-1 rounded-full bg-ink/40"></span>
                      <span>{j.readTime}</span>
                    </div>
                    <h4 className="mt-3 font-display text-xl md:text-2xl font-medium leading-tight group-hover:text-brand transition-colors">
                      <a href="/journal" className="cursor-pointer">
                        {j.title}
                      </a>
                    </h4>
                    <p className="mt-3 text-sm text-ink/70 leading-relaxed">
                      {j.excerpt}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
            <div className="mt-10 pb-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono tracking-[0.2em] text-ink/50">
              <span>FIN DEL CONTENIDO</span>
              <a
                href="/journal"
                className="inline-flex items-center gap-2 text-ink hover:text-brand cursor-pointer"
              >
                ABRIR BLOG COMPLETO
                <i className="ri-arrow-right-line"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}