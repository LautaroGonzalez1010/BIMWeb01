import Navbar from "@/pages/home/components/Navbar";
import Footer from "@/pages/home/components/Footer";
import AboutHero from "./components/AboutHero";
import Reveal from "@/components/base/Reveal";
import { stats, team, values, timeline } from "@/mocks/projects";

export default function AboutPage() {
  return (
    <main className="bg-cream text-ink">
      <div className="relative">
        <Navbar variant="dark" />
        <AboutHero />
      </div>

      <section id="content" className="bg-cream text-ink py-24 md:py-36 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal animation="fade-up" duration={700} className="md:col-span-3">
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ ESTUDIO ]</span>
          </Reveal>
          <div className="md:col-span-9">
            <Reveal animation="fade-up" duration={900}>
              <h2 className="font-display font-medium leading-[0.95] text-[clamp(36px,6vw,84px)]">
                Proyectamos <em className="italic text-brand">arquitectura</em> que dialoga con el paisaje y perdura en el tiempo.
              </h2>
            </Reveal>
            <Reveal animation="fade-up" delay={200} duration={900}>
              <p className="mt-10 max-w-2xl text-base md:text-lg text-ink/70 leading-relaxed">
                Con sede en Berazategui y proyectando en el sur del Gran Buenos Aires,
                BIM Arquitectura & Desarrollo es un estudio de 8 personas dedicado al diseño arquitectónico,
                la dirección de obra y la remodelación. Creemos que cada proyecto nace de las necesidades reales
                — y que la funcionalidad, la orientación correcta y los materiales nobles siempre estarán por encima de las modas.
              </p>
            </Reveal>
            <Reveal animation="fade-up" delay={350} duration={900}>
              <p className="mt-6 max-w-2xl text-base md:text-lg text-ink/70 leading-relaxed">
                Nuestro trabajo comienza con una conversación pausada sobre el lugar, el
                programa y la atmósfera que se desea crear, antes de dibujar una sola línea.
                Luego pasamos meses en el taller y en obra, junto a nuestros albañiles y artesanos
                — hasta que cada encuentro, cada material, cada entrada de luz ha sido
                cuidadosamente considerado.
              </p>
            </Reveal>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-ink/15 pt-10">
              {stats.map((s, i) => (
                <Reveal
                  key={s.label}
                  animation="fade-up"
                  delay={200 + i * 130}
                  duration={800}
                >
                  <div>
                    <div className="font-display text-4xl md:text-5xl font-medium tracking-tight">
                      {s.value}
                    </div>
                    <div className="mt-2 text-xs md:text-sm text-ink/60 leading-snug">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone text-ink py-24 md:py-32 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <Reveal animation="fade-up" duration={800} className="md:col-span-5">
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ VALORES ]</span>
            <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,5vw,72px)]">
              Cuatro ideas, aplicadas con paciencia.
            </h2>
          </Reveal>
          <Reveal animation="fade-up" delay={150} duration={900} className="md:col-span-7">
            <p className="text-base md:text-lg text-ink/70 leading-relaxed">
              No nos interesa un estilo de firma. Nos interesan cuatro ideas,
              aplicadas cuidadosamente a cada proyecto, hasta que se manifiestan en
              la manera en que una puerta se abre o una fachada recibe la luz de la mañana.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-px bg-ink/15 rounded-lg overflow-hidden">
          {values.map((v, i) => (
            <Reveal
              key={v.title}
              animation="fade-up"
              delay={i * 140}
              duration={800}
              className="bg-bone p-8 md:p-12"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs text-ink/40">0{i + 1}</span>
                <h3 className="font-display text-3xl md:text-4xl font-medium">{v.title}</h3>
              </div>
              <p className="mt-6 text-base md:text-lg text-ink/70 leading-relaxed max-w-md">
                {v.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream text-ink py-24 md:py-32 px-6 md:px-10">
        <Reveal animation="fade-up" duration={800}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ EQUIPO ]</span>
              <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,6vw,84px)]">
                Las manos detrás de cada proyecto.
              </h2>
            </div>
            <a
              href="/contact"
              className="inline-flex items-center gap-3 text-sm tracking-[0.2em] font-medium cursor-pointer whitespace-nowrap group"
            >
              ÚNETE AL ESTUDIO
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
              delay={i * 130}
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

      <section className="bg-brand-dark text-cream py-24 md:py-32 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <Reveal animation="fade-up" duration={800} className="md:col-span-5">
            <span className="font-mono text-xs tracking-[0.25em] text-cream/60">[ CRONOLOGÍA ]</span>
            <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,5vw,72px)]">
              Dieciocho años, sin prisa.
            </h2>
          </Reveal>
          <Reveal animation="fade-up" delay={150} duration={900} className="md:col-span-7">
            <p className="text-base md:text-lg text-cream/70 leading-relaxed max-w-xl">
              Una breve cronología de los momentos que han dado forma al estudio — desde
              un pequeño taller en Berazategui hasta más de sesenta proyectos entregados
              en el sur del Gran Buenos Aires.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 border-t border-cream/15">
          {timeline.map((t, i) => (
            <Reveal
              key={t.year}
              animation="fade-right"
              delay={i * 120}
              duration={800}
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 py-8 border-b border-cream/15">
                <div className="font-display text-3xl md:text-5xl font-medium tracking-tight sm:w-24 md:w-32 shrink-0">
                  {t.year}
                </div>
                <div className="text-base md:text-lg text-cream/80 leading-relaxed max-w-2xl">
                  {t.text}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}