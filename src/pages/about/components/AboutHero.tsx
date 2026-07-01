import Reveal from "@/components/base/Reveal";

export default function AboutHero() {
  return (
    <section className="bg-cream text-ink pt-32 md:pt-40 pb-12 md:pb-16 px-6 md:px-10 border-b border-ink/15">
      <Reveal animation="fade-down" duration={700}>
        <div className="flex items-center justify-between flex-wrap gap-3">
          <span className="font-mono text-xs tracking-[0.25em] text-ink/60">
            [ ÍNDICE / 02 ]
          </span>
          <span className="font-mono text-xs tracking-[0.25em] text-ink/60">
            FUND. 2015 · BERAZATEGUI · BUENOS AIRES
          </span>
        </div>
      </Reveal>

      <Reveal animation="fade-up" delay={150} duration={1100}>
        <h1 className="mt-10 font-display font-medium leading-[0.9] tracking-tight text-[clamp(60px,11vw,180px)]">
          El <em className="italic text-brand">Estudio</em>
        </h1>
      </Reveal>
    </section>
  );
}