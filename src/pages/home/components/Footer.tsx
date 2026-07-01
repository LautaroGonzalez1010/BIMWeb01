import { Link } from "react-router-dom";
import Reveal from "@/components/base/Reveal";

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-cream px-6 md:px-10 pt-20 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-cream/15">
        <Reveal animation="fade-up" duration={900} className="md:col-span-5">
          <div className="font-display text-4xl md:text-6xl font-medium leading-none">
            BIM<br />Arquitectura & Desarrollo
          </div>
          <p className="mt-6 max-w-sm text-sm text-cream/60 leading-relaxed">
            Estudio de arquitectura con sede en Berazategui, proyectando viviendas, edificios multifamiliares y espacios comerciales en el sur del Gran Buenos Aires.
          </p>
        </Reveal>

        <Reveal animation="fade-up" delay={120} duration={800} className="md:col-span-2">
          <div className="font-mono text-[11px] tracking-[0.25em] text-cream/50 mb-4">NAVEGAR</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/" className="hover:text-white cursor-pointer">Inicio</Link></li>
            <li><Link to="/projects" className="hover:text-white cursor-pointer">Proyectos</Link></li>
            <li><Link to="/about" className="hover:text-white cursor-pointer">Estudio</Link></li>
            <li><Link to="/journal" className="hover:text-white cursor-pointer">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-white cursor-pointer">Contacto</Link></li>
          </ul>
        </Reveal>

        <Reveal animation="fade-up" delay={240} duration={800} className="md:col-span-2">
          <div className="font-mono text-[11px] tracking-[0.25em] text-cream/50 mb-4">ZONA DE INFLUENCIA</div>
          <ul className="space-y-3 text-sm">
            <li>Berazategui</li>
            <li>Florencio Varela</li>
            <li>Quilmes</li>
          </ul>
        </Reveal>

        <Reveal animation="fade-up" delay={360} duration={800} className="md:col-span-3">
          <div className="font-mono text-[11px] tracking-[0.25em] text-cream/50 mb-4">SOCIAL</div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center"><i className="ri-instagram-line"></i></span>
              <a href="https://www.instagram.com/bimarquitectura/" rel="nofollow" target="_blank" className="hover:text-white cursor-pointer">@bimarquitectura</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center"><i className="ri-facebook-line"></i></span>
              <a href="https://www.facebook.com" rel="nofollow" target="_blank" className="hover:text-white cursor-pointer">BIM Arquitectura</a>
            </li>
            <li className="flex items-center gap-3">
              <span className="w-6 h-6 flex items-center justify-center"><i className="ri-whatsapp-line"></i></span>
              <a href="https://wa.me/5491123456789" rel="nofollow" target="_blank" className="hover:text-white cursor-pointer">+54 9 11 2345-6789</a>
            </li>
          </ul>
        </Reveal>
      </div>

      {/* Technical registrations strip */}
      <Reveal animation="fade-in" delay={200} duration={900}>
        <div className="relative py-6 border-b border-cream/10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[10px] tracking-[0.25em] text-cream/60">
          <span className="flex items-center gap-2"><i className="ri-shield-check-line"></i>MATRICULADO CPAU</span>
          <span className="flex items-center gap-2"><i className="ri-file-paper-2-line"></i>DIRECCIÓN TÉCNICA</span>
          <span className="flex items-center gap-2"><i className="ri-leaf-line"></i>CONSTRUCCIÓN SOSTENIBLE</span>
          <span className="flex items-center gap-2"><i className="ri-tools-line"></i>SEGUIMIENTO DE OBRA</span>
          <span className="flex items-center gap-2"><i className="ri-map-pin-line"></i>BERAZATEGUI, BUENOS AIRES</span>
        </div>
      </Reveal>

      <div className="relative pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-cream/50 font-mono tracking-wider">
        <div>© 2026 BIM ARQUITECTURA & DESARROLLO — TODOS LOS DERECHOS RESERVADOS</div>
        <div className="flex items-center gap-5">
          <Link to="/contact" className="hover:text-cream cursor-pointer">PRIVACIDAD</Link>
          <Link to="/contact" className="hover:text-cream cursor-pointer">AVISO LEGAL</Link>
          <Link to="/contact" className="hover:text-cream cursor-pointer">COOKIES</Link>
        </div>
      </div>
    </footer>
  );
}