import { useEffect } from "react";
import type { projects } from "@/mocks/projects";
import { motion, AnimatePresence } from "framer-motion";

type Project = (typeof projects)[number];

interface ProjectSheetProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectSheet({ project, onClose }: ProjectSheetProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[60] bg-ink/85 backdrop-blur-sm flex items-start md:items-center justify-center overflow-y-auto animate-lightbox-fade"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Ficha técnica de ${project.title}`}
    >
      <div
        className="relative w-full md:max-w-6xl min-h-full md:min-h-0 md:max-h-[92vh] bg-cream md:rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-12 animate-lightbox-rise"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left column — images */}
        <div className="md:col-span-7 flex flex-col gap-3 md:gap-4 p-4 md:p-6">
          <div className="relative w-full overflow-hidden rounded-md bg-bone min-h-[220px] sm:min-h-[280px] md:min-h-[240px]">
            <img
              src={project.image}
              alt={`${project.title} — imagen principal`}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-cream/95 text-ink text-[10px] tracking-[0.2em] font-medium">
              {project.category.toUpperCase()}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="relative aspect-square overflow-hidden rounded-md bg-bone">
              <img
                src={project.planImage}
                alt={`${project.title} — plano arquitectónico`}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[0.2em] text-ink/60 bg-cream/80 px-1.5 py-0.5 rounded">
                PLANO
              </span>
            </div>
            <div className="relative aspect-square overflow-hidden rounded-md bg-bone">
              <img
                src={project.renderImage}
                alt={`${project.title} — render 3D`}
                className="w-full h-full object-cover object-top"
              />
              <span className="absolute bottom-2 left-2 font-mono text-[9px] tracking-[0.2em] text-ink/60 bg-cream/80 px-1.5 py-0.5 rounded">
                RENDER
              </span>
            </div>
          </div>

          {/* Desktop-only scroll spacer for the images column */}
          <div className="hidden md:block flex-1 min-h-0" />
        </div>

        {/* Right column — technical sheet */}
        <div className="md:col-span-5 p-4 md:p-8 flex flex-col text-ink md:overflow-y-auto">
          <div className="font-mono text-[11px] tracking-[0.25em] text-ink/50">
            PROYECTO {project.index} — {project.year}
          </div>
          <h3 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-medium leading-[1.05]">
            {project.title}
          </h3>
          <div className="mt-2 text-sm text-ink/60">{project.location}</div>

          <div className="mt-5 md:mt-6 border-t border-ink/10" />

          <dl className="mt-4 md:mt-5 space-y-2.5 md:space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Tipología</dt>
              <dd className="text-right">{project.typology}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Superficie</dt>
              <dd className="text-right">{project.surface}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Año</dt>
              <dd className="text-right">{project.year}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Ubicación</dt>
              <dd className="text-right">{project.location}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Cliente</dt>
              <dd className="text-right">{project.client}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Estado</dt>
              <dd className="text-right">{project.status}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Materiales</dt>
              <dd className="text-right">{project.materials}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-mono text-[10px] tracking-[0.2em] text-ink/50 uppercase">Fotografía</dt>
              <dd className="text-right">{project.photographer}</dd>
            </div>
          </dl>

          <div className="mt-5 md:mt-6 border-t border-ink/10" />

          <p className="mt-4 md:mt-5 text-sm leading-relaxed text-ink/75">
            {project.description}
          </p>

          <div className="mt-6 md:mt-auto md:pt-6 pb-2 md:pb-0 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[11px] tracking-[0.2em] text-ink/60 hover:text-ink cursor-pointer text-center sm:text-left whitespace-nowrap"
            >
              CERRAR
            </button>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-ink text-cream text-[11px] tracking-[0.2em] font-medium cursor-pointer whitespace-nowrap hover:bg-brand transition-colors"
            >
              INICIAR UN PROYECTO
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>

        {/* Close button — always visible */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ficha técnica"
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full bg-cream/95 text-ink hover:bg-brand hover:text-cream cursor-pointer transition-colors z-10"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>
    </div>
  );
}