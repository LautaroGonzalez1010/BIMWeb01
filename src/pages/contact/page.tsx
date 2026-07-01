import { useState } from "react";
import Navbar from "@/pages/home/components/Navbar";
import Footer from "@/pages/home/components/Footer";
import ContactHero from "./components/ContactHero";
import Reveal from "@/components/base/Reveal";

const FORM_URL = "https://readdy.ai/api/form/d92a5u7efssur58kqtq0";
const MAX_MESSAGE = 500;

const projectTypes = ["Residencial", "Multifamiliar", "Comercial", "Remodelación"];
const budgets = ["< $30.000.000", "$30M – $100M", "$100M – $300M", "$300M +"];
const timelines = ["Menos de 6 meses", "6 – 12 meses", "12 – 24 meses", "Solo explorando"];

const offices = [
  {
    city: "Berazategui",
    address: "C. 141, N° 1392 3°B\nBerazategui 1880, Buenos Aires",
    email: "hola@bimarquitectura.com",
    phone: "+54 9 11 2345-6789",
  },
  {
    city: "Florencio Varela",
    address: "Av. San Martín 2456\nFlorencio Varela 1888, Buenos Aires",
    email: "varela@bimarquitectura.com",
    phone: "+54 9 11 2345-6790",
  },
  {
    city: "Quilmes",
    address: "Calle Mitre 890\nQuilmes 1878, Buenos Aires",
    email: "quilmes@bimarquitectura.com",
    phone: "+54 9 11 2345-6791",
  },
];

const faqs = [
  {
    q: "¿Trabajan en otras zonas del Gran Buenos Aires?",
    a: "Sí — además de Berazategui y Florencio Varela, desarrollamos proyectos en Quilmes y zonas aledañas del sur del GBA. Nos desplazamos cuando el encargo lo requiere.",
  },
  {
    q: "¿Cuánto dura un proyecto típico de arquitectura?",
    a: "Entre doce y veinticuatro meses desde la primera conversación hasta la entrega de llaves, dependiendo de la escala y de los trámites municipales. No aceptamos proyectos que necesiten ser acelerados.",
  },
  {
    q: "¿Pueden colaborar con mi constructor o albañil de confianza?",
    a: "A menudo, sí. Estamos encantados de colaborar con un equipo de confianza con el que ya trabajes, particularmente en la parte técnica y de construcción.",
  },
  {
    q: "¿Ofrecen remodelación sin demoler la estructura existente?",
    a: "Sí — es una de nuestras especialidades. Evaluamos la estructura existente y, cuando es viable, diseñamos una transformación integral que conserva los muros y cimientos originales.",
  },
];

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (message.length > MAX_MESSAGE) {
      setError(`El mensaje debe tener ${MAX_MESSAGE} caracteres o menos.`);
      return;
    }

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    const honeypot = formData.get("phone_alt") as string;
    if (honeypot && honeypot.trim() !== "") {
      setStatus("success");
      formEl.reset();
      setMessage("");
      return;
    }
    formData.delete("phone_alt");

    const params = new URLSearchParams();
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        params.append(key, value);
      } else {
        params.append(key, "No disponible");
      }
    });

    try {
      setStatus("submitting");
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      if (!res.ok) throw new Error("Error de red");
      setStatus("success");
      formEl.reset();
      setMessage("");
    } catch {
      setStatus("error");
      setError("Algo salió mal. Por favor inténtalo de nuevo o escríbenos directamente.");
    }
  };

  return (
    <main className="bg-cream text-ink">
      <div className="relative">
        <Navbar variant="dark" />
        <ContactHero />
      </div>

      <section id="content" className="bg-cream text-ink py-24 md:py-32 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
          <div className="md:col-span-5">
            <Reveal animation="fade-up" duration={800}>
              <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ BRIEF ]</span>
              <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,5vw,72px)]">
                Cuéntanos sobre <em className="italic text-brand">el proyecto</em>.
              </h2>
            </Reveal>
            <Reveal animation="fade-up" delay={150} duration={900}>
              <p className="mt-6 max-w-md text-base md:text-lg text-ink/70 leading-relaxed">
                Cuanta más información puedas compartir — planos, fotos del solar, un
                moodboard, incluso una sola sensación — mejor podremos responder.
                Alguien del estudio te contestará en un plazo de dos días laborables.
              </p>
            </Reveal>

            <div className="mt-10 space-y-6 text-sm md:text-base text-ink/70">
              <Reveal animation="fade-left" delay={250} duration={800}>
                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/20 shrink-0">
                    <i className="ri-mail-line"></i>
                  </span>
                  <div>
                    <div className="font-mono text-xs tracking-[0.25em] text-ink/50">GENERAL</div>
                    <a href="mailto:hola@bimarquitectura.com" className="mt-1 block hover:text-brand cursor-pointer">
                      hola@bimarquitectura.com
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal animation="fade-left" delay={350} duration={800}>
                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/20 shrink-0">
                    <i className="ri-newspaper-line"></i>
                  </span>
                  <div>
                    <div className="font-mono text-xs tracking-[0.25em] text-ink/50">PRENSA</div>
                    <a href="mailto:prensa@bimarquitectura.com" className="mt-1 block hover:text-brand cursor-pointer">
                      prensa@bimarquitectura.com
                    </a>
                  </div>
                </div>
              </Reveal>
              <Reveal animation="fade-left" delay={450} duration={800}>
                <div className="flex items-start gap-4">
                  <span className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/20 shrink-0">
                    <i className="ri-briefcase-line"></i>
                  </span>
                  <div>
                    <div className="font-mono text-xs tracking-[0.25em] text-ink/50">CARRERA</div>
                    <a href="mailto:unete@bimarquitectura.com" className="mt-1 block hover:text-brand cursor-pointer">
                      unete@bimarquitectura.com
                    </a>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          <Reveal animation="fade-up" delay={200} duration={900} className="md:col-span-7">
            <form
              id="bim-arquitectura-contacto"
              data-readdy-form
              onSubmit={handleSubmit}
              className="bg-bone rounded-lg p-8 md:p-10"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Field label="Nombre completo" name="name" required placeholder="Martín Benítez" />
                <Field label="Email" name="email" type="email" required placeholder="tu@estudio.com" />
                <Field label="Teléfono (opcional)" name="phone" placeholder="+34 ..." />
                <Field label="Ubicación del proyecto" name="location" required placeholder="Ciudad, país" />
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <SelectField label="Tipo de proyecto" name="projectType" options={projectTypes} />
                <SelectField label="Presupuesto" name="budget" options={budgets} />
                <SelectField label="Plazo" name="timeline" options={timelines} />
              </div>

              <input
                type="text"
                name="phone_alt"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute opacity-0 pointer-events-none top-[-9999px] left-[-9999px]"
              />

              <div className="mt-6">
                <label className="block">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] tracking-[0.25em] text-ink/60">
                      CUÉNTANOS SOBRE EL PROYECTO
                    </span>
                    <span className={`font-mono text-[11px] ${message.length > MAX_MESSAGE ? "text-brand-dark" : "text-ink/50"}`}>
                      {message.length} / {MAX_MESSAGE}
                    </span>
                  </div>
                  <textarea
                    name="message"
                    rows={6}
                    maxLength={MAX_MESSAGE}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="El lugar, el programa, la atmósfera que imaginas al entrar..."
                    className="w-full px-4 py-3 rounded-md bg-cream border border-ink/15 text-sm focus:outline-none focus:border-brand transition-colors resize-none"
                    required
                  />
                </label>
              </div>

              <div className="mt-6 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  value="Sí"
                  className="mt-1 accent-brand cursor-pointer"
                />
                <label htmlFor="newsletter" className="text-sm text-ink/70 cursor-pointer">
                  También quiero recibir el blog del estudio — unas pocas veces al año, nunca más.
                </label>
              </div>

              {error && (
                <div className="mt-6 text-sm text-brand-dark font-medium">{error}</div>
              )}
              {status === "success" && (
                <div className="mt-6 p-4 rounded-md bg-brand text-white text-sm">
                  Gracias. Tu mensaje ha llegado al estudio — te responderemos en un
                  plazo de dos días laborables.
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs text-ink/50 font-mono tracking-wider">
                  TUS DATOS SE USAN SOLO PARA RESPONDER A ESTA CONSULTA.
                </div>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-full bg-ink text-cream text-sm tracking-[0.2em] font-medium cursor-pointer whitespace-nowrap hover:bg-brand transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "ENVIANDO..." : "ENVIAR CONSULTA"}
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="bg-bone text-ink py-24 md:py-32 px-6 md:px-10">
        <Reveal animation="fade-up" duration={800}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ OFICINAS ]</span>
              <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,5vw,72px)]">
                Tres estudios silenciosos.
              </h2>
            </div>
            <p className="max-w-sm text-sm md:text-base text-ink/70 leading-relaxed">
              Visitas solo con cita previa — ponte en contacto antes de pasar, nuestros equipos
              suelen estar en obra con los clientes.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {offices.map((o, i) => (
            <Reveal key={o.city} animation="fade-up" delay={i * 140} duration={800}>
              <div className="bg-cream rounded-lg p-8 md:p-10 h-full">
                <div className="font-mono text-xs tracking-[0.25em] text-ink/50">OFICINA</div>
                <h3 className="mt-3 font-display text-3xl md:text-4xl font-medium">{o.city}</h3>
                <p className="mt-6 text-sm md:text-base text-ink/70 leading-relaxed whitespace-pre-line">
                  {o.address}
                </p>
                <div className="mt-6 space-y-2 text-sm">
                  <a href={`mailto:${o.email}`} className="flex items-center gap-2 hover:text-brand cursor-pointer">
                    <i className="ri-mail-line"></i> {o.email}
                  </a>
                  <a href={`tel:${o.phone.replace(/\s/g, "")}`} className="flex items-center gap-2 hover:text-brand cursor-pointer">
                    <i className="ri-phone-line"></i> {o.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-cream text-ink py-24 md:py-32 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal animation="fade-up" duration={800} className="md:col-span-4">
            <span className="font-mono text-xs tracking-[0.25em] text-ink/60">[ FAQ ]</span>
            <h2 className="mt-4 font-display font-medium leading-[0.95] text-[clamp(36px,5vw,64px)]">
              Preguntas frecuentes.
            </h2>
          </Reveal>
          <div className="md:col-span-8">
            <div className="border-t border-ink/15">
              {faqs.map((f, i) => (
                <Reveal key={f.q} animation="fade-up" delay={i * 110} duration={800}>
                  <details className="group border-b border-ink/15 py-6" open={i === 0}>
                    <summary className="flex items-center justify-between gap-6 cursor-pointer list-none">
                      <span className="font-display text-xl md:text-2xl font-medium">{f.q}</span>
                      <span className="w-9 h-9 flex items-center justify-center rounded-full border border-ink/20 text-ink/70 group-open:bg-ink group-open:text-cream group-open:border-ink transition-colors">
                        <i className="ri-add-line group-open:hidden"></i>
                        <i className="ri-subtract-line hidden group-open:block"></i>
                      </span>
                    </summary>
                    <p className="mt-4 max-w-2xl text-base md:text-lg text-ink/70 leading-relaxed">
                      {f.a}
                    </p>
                  </details>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}

function Field({ label, name, type = "text", required, placeholder }: FieldProps) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] tracking-[0.25em] text-ink/60 mb-2">
        {label.toUpperCase()}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-md bg-cream border border-ink/15 text-sm focus:outline-none focus:border-brand transition-colors"
      />
    </label>
  );
}

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
}

function SelectField({ label, name, options }: SelectFieldProps) {
  return (
    <label className="block">
      <span className="block font-mono text-[11px] tracking-[0.25em] text-ink/60 mb-2">
        {label.toUpperCase()}
      </span>
      <div className="relative">
        <select
          name={name}
          defaultValue=""
          className="w-full appearance-none px-4 py-3 pr-10 rounded-md bg-cream border border-ink/15 text-sm focus:outline-none focus:border-brand transition-colors cursor-pointer"
        >
          <option value="" disabled>Seleccionar...</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-ink/50">
          <i className="ri-arrow-down-s-line"></i>
        </span>
      </div>
    </label>
  );
}