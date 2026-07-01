import { team } from "@/mocks/projects";
import Reveal from "@/components/base/Reveal";

export default function Team() {
  return (
    <section className="bg-cream text-ink py-24 md:py-32 px-6 md:px-10">
      <Reveal animation="fade-up" duration={800}>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ 04 / EQUIPO ]</span>
            <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,6vw,84px)]">
              Las manos detrás de cada proyecto.
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 text-sm tracking-[0.2em] font-medium cursor-pointer whitespace-nowrap group"
          >
            CONOCE AL ESTUDIO COMPLETO
            <span className="w-9 h-9 flex items-center justify-center border border-ink/30 rounded-full group-hover:bg-ink group-hover:text-cream transition-colors">
              <i className="ri-arrow-right-line"></i>
            </span>
          </a>
        </div>
      </Reveal>

      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        {team.map((m, i) => (
          <Reveal
            key={m.name}
            animation="fade-up"
            delay={i * 140}
            duration={900}
          >
            <div className="group cursor-pointer">
              <div className="relative w-full h-[280px] md:h-[420px] overflow-hidden rounded-lg bg-bone">
                <img
                  src={m.image}
                  alt={`Retrato de ${m.name}, ${m.role} en BIM Arquitectura & Desarrollo`}
                  title={`${m.name} - ${m.role}`}
                  className="w-full h-full object-cover object-top transition-transform duration-[1200ms] group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 font-display text-xl md:text-2xl font-medium">{m.name}</h3>
              <div className="mt-1 text-xs md:text-sm text-ink/60 tracking-wide">{m.role}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}