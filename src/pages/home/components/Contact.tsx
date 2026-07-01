import Reveal from "@/components/base/Reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative bg-brand text-white py-24 md:py-36 px-6 md:px-10 overflow-hidden"
    >
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <Reveal animation="fade-up" duration={800}>
            <span className="font-mono text-xs tracking-[0.25em] text-white/70">[ 06 / CONTACTO ]</span>
          </Reveal>
          <Reveal animation="fade-up" delay={120} duration={1100}>
            <h2 className="mt-4 font-display font-medium leading-[0.9] text-[clamp(48px,9vw,140px)]">
              Hablemos de tu proyecto.
            </h2>
          </Reveal>
          <Reveal animation="fade-up" delay={300} duration={900}>
            <p className="mt-8 max-w-lg text-base md:text-lg text-white/85 leading-relaxed">
              Tanto si tienes un solar, un programa definido o solo una intuición — nos gustaría escucharlo.
              Escríbenos y alguien del estudio te responderá en un plazo de dos días laborables.
            </p>
          </Reveal>

          <Reveal animation="fade-up" delay={450} duration={900}>
            <div className="mt-10 flex flex-wrap items-center gap-4 font-mono text-[11px] tracking-[0.22em] text-white/75">
              <span className="flex items-center gap-2 border border-white/30 rounded-full px-3 py-1.5">
                <i className="ri-shield-check-line"></i>MATRICULADO CPAU
              </span>
              <span className="flex items-center gap-2 border border-white/30 rounded-full px-3 py-1.5">
                <i className="ri-medal-line"></i>DIRECCIÓN DE OBRA
              </span>
              <span className="flex items-center gap-2 border border-white/30 rounded-full px-3 py-1.5">
                <i className="ri-leaf-line"></i>CONSTRUCCIÓN SOSTENIBLE
              </span>
            </div>
          </Reveal>
        </div>

        <div className="md:col-span-5 flex flex-col gap-8">
          {[
            { label: "ESTUDIO", body: <>C. 141, N° 1392 3°B<br />Berazategui 1880, Buenos Aires, Argentina</>, isLink: false },
            { label: "GENERAL", body: <a href="mailto:hola@bimarquitectura.com" className="mt-2 block text-base md:text-lg underline underline-offset-4 cursor-pointer">hola@bimarquitectura.com</a>, isLink: true },
            { label: "PRENSA", body: <a href="mailto:prensa@bimarquitectura.com" className="mt-2 block text-base md:text-lg underline underline-offset-4 cursor-pointer">prensa@bimarquitectura.com</a>, isLink: true },
          ].map((row, i) => (
            <Reveal
              key={row.label}
              animation="fade-left"
              delay={150 + i * 130}
              duration={800}
            >
              <div>
                <div className="font-mono text-xs tracking-[0.25em] text-white/60">{row.label}</div>
                {row.isLink ? row.body : <div className="mt-2 text-base md:text-lg">{row.body}</div>}
              </div>
            </Reveal>
          ))}
          <Reveal animation="fade-up" delay={600} duration={800}>
            <a
              href="mailto:hola@bimarquitectura.com"
              className="mt-4 inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-white text-brand text-sm tracking-[0.2em] font-medium cursor-pointer whitespace-nowrap hover:bg-cream transition-colors"
            >
              INICIAR UN PROYECTO
              <i className="ri-arrow-right-line"></i>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}