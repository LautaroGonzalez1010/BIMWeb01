import { stats } from "@/mocks/projects";
import Reveal from "@/components/base/Reveal";
import logo5 from "@/img/IMG1HOME.png";

const statIcons: Record<string, string> = {
  "Proyectos realizados": "ri-building-4-line",
  "Años de trayectoria": "ri-calendar-line",
  "Personas en el equipo": "ri-team-line",
  "Buenos Aires, Argentina": "ri-map-pin-line",
};

export default function Intro() {
  return (
    <section id="about" className="bg-cream text-ink py-24 md:py-36 px-6 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-5">
          <Reveal animation="fade-down" duration={700}>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ 01 / ESTUDIO ]</span>
           
            </div>
          </Reveal>

          <Reveal animation="clip-up" delay={150} duration={1100}>
            <div className="mt-6 relative aspect-[4/5] w-full overflow-hidden rounded-md border border-ink/10 bg-ink/5">
              <img
                src={logo5}
                alt="Interior del estudio de BIM Arquitectura en Berazategui con mesa de dibujo y maquetas"
                className="absolute inset-0 w-full h-full object-cover object-top animate-slow-zoom"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between font-mono text-[10px] tracking-[0.25em] text-cream">
                <span className="bg-ink/55 backdrop-blur-sm px-2 py-1 rounded">
                  FIG. 01 — OFICINA BIM, BERAZATEGUI
                </span>
                
              </div>
            </div>
          </Reveal>

       
        </div>

        <div className="md:col-span-7 flex flex-col items-center justify-center text-center">
          <Reveal animation="fade-up" duration={900}>
            <h2 className="mt-6 font-display font-medium leading-[1.02] text-[clamp(26px,3.4vw,52px)]">
              Proyectamos <em className="italic text-brand">arquitectura</em> que se adapta a tu vida y perdura en el tiempo.
            </h2>
          </Reveal>

          <Reveal animation="fade-up" delay={200} duration={900}>
            <p className="mt-8 max-w-2xl text-sm md:text-base text-ink/70 leading-relaxed">
              Con sede en Berazategui y proyectando en el sur del Gran Buenos Aires,
              BIM Arquitectura & Desarrollo es un estudio de 8 personas dedicado al diseño arquitectónico,
              la dirección de obra y la remodelación. Creemos que cada proyecto nace de las necesidades reales
              — y que la funcionalidad, la orientación correcta y los materiales nobles siempre estarán por encima de las modas.
            </p>
          </Reveal>

          <div className="mt-12 w-full grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-ink/15 pt-8">
            {stats.map((s, i) => (
              <Reveal
                key={s.label}
                animation="fade-up"
                delay={300 + i * 120}
                duration={800}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center gap-2">
                    <i className={`${statIcons[s.label] ?? "ri-checkbox-circle-line"} text-base text-brand`}></i>
                    <div className="font-display text-2xl md:text-3xl font-medium tracking-tight">
                      {s.value}
                    </div>
                  </div>
                  <div className="mt-2 text-[11px] md:text-xs text-ink/60 leading-snug tracking-wide">
                    {s.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}