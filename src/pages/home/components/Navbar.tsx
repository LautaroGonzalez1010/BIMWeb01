import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";


const links = [
  { label: "INICIO", to: "/" },
  { label: "PROYECTOS", to: "/projects" },
  { label: "ESTUDIO", to: "/about" },
  { label: "BLOG", to: "/journal" },
  { label: "CONTACTO", to: "/contact" },
];

interface NavbarProps {
  variant?: "light" | "dark";
}

type MenuPhase = "hidden" | "mounting" | "open" | "leaving";

export default function Navbar({ variant = "light" }: NavbarProps) {
  const [phase, setPhase] = useState<MenuPhase>("hidden");
  const location = useLocation();
  const lock = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isOpen = phase === "open";
  const isVisible = phase === "mounting" || phase === "open" || phase === "leaving";

  /* ── Abrir con frame-flush para forzar la transición ── */
  const openMenu = useCallback(() => {
    if (lock.current) return;
    lock.current = true;

    // 1. Montar en estado inicial (todo desplazado, sin la clase .open)
    setPhase("mounting");

    // 2. Esperar al siguiente frame de paint del browser
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // 3. Ahora sí aplicar .open → el browser detecta el cambio y anima
        setPhase("open");
        lock.current = false;
      });
    });
  }, []);

  /* ── Cerrar con animación de salida ── */
  const closeMenu = useCallback(() => {
    if (lock.current || phase !== "open") return;
    lock.current = true;

    setPhase("leaving");
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setPhase("hidden");
      lock.current = false;
    }, 550);
  }, [phase]);

  /* ── Toggle inteligente ── */
  const toggleMenu = useCallback(() => {
    if (phase === "hidden") openMenu();
    else if (phase === "open") closeMenu();
  }, [phase, openMenu, closeMenu]);

  /* ── Cerrar al navegar ── */
  useEffect(() => {
    if (isOpen) closeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  /* ── Body lock ── */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ── Cleanup ── */
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      document.body.style.overflow = "";
    };
  }, []);

  const isLight = variant === "light";
  const textColor = isLight ? "text-white" : "text-ink";
  const dividerColor = isLight ? "bg-white/30" : "bg-ink/15";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 10);
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

const [showDesktopNav, setShowDesktopNav] = useState(true);
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    if (window.innerWidth < 768) return;

    const currentScrollY = window.scrollY;

    if (currentScrollY <= 20) {
      setShowDesktopNav(true);
    } else if (currentScrollY < lastScrollY.current) {
      // Está subiendo
      setShowDesktopNav(true);
    } else {
      // Está bajando
      setShowDesktopNav(false);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll);

  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      {/* ═══════════════ HEADER ═══════════════ */}
<header
  className={`fixed md:fixed top-0 left-0 right-0 z-50
    transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
    ${
      showDesktopNav
        ? "md:translate-y-0 md:opacity-100"
        : "md:-translate-y-8 md:opacity-0"
    }
    ${
      scrolled
        ? isLight
          ? "bg-brand/90 backdrop-blur-md"
          : "bg-[rgba(255,255,255,0.75)] backdrop-blur-md"
        : "bg-transparent backdrop-blur-none"
    }`}
>
        <nav className={`w-full px-4 md:px-10 pt-6 md:pt-10 pb-4 md:pb-6 ${textColor}`}>
          <div className="flex items-center justify-between">
            <Link to="/" className="font-display text-3xl md:text-5xl tracking-tight whitespace-nowrap cursor-pointer">
              <span className="block leading-[0.85]">BIM</span>
            </Link>
            <div className="hidden md:flex items-center gap-10 text-[13px] tracking-[0.18em] font-medium">
              {links.map((l) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.label}
                    to={l.to}
                    className={`hover:opacity-70 transition-opacity cursor-pointer whitespace-nowrap relative ${
                      active ? "opacity-100" : "opacity-90"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className={`absolute -bottom-2 left-0 right-0 h-px ${isLight ? "bg-white" : "bg-ink"}`} />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Toggle arquitectónico (mobile) */}
            <button
              type="button"
              onClick={toggleMenu}
              className={`md:hidden arch-toggle cursor-pointer ${textColor}`}
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            >
              <div className={`arch-toggle ${isOpen ? "active" : ""}`}>
                <div className="arch-toggle-ring" />
                <div className="arch-toggle-cross-v" />
                <div className="arch-toggle-cross-h" />
                <div className="arch-toggle-dot arch-toggle-dot-tl" />
                <div className="arch-toggle-dot arch-toggle-dot-tr" />
                <div className="arch-toggle-dot arch-toggle-dot-bl" />
                <div className="arch-toggle-dot arch-toggle-dot-br" />
              </div>
            </button>
          </div>
          <div className={`mt-4 md:mt-8 h-px w-full ${dividerColor}`} />
        </nav>
      </header>

      {/* ═══════════════ MOBILE MENU OVERLAY (hermano del header) ═══════════════ */}
      {isVisible && (
        <div className={`mobile-menu-overlay ${isOpen ? "open" : ""} ${phase === "leaving" ? "leaving" : ""}`}>
          <div className="mobile-menu-bg" />
          <div className="mobile-menu-grid" />
          <div className="mobile-menu-content">
            <div className="flex items-center justify-end px-4 pt-6 pb-4">
              <button
                type="button"
                onClick={closeMenu}
                className="mobile-close-btn cursor-pointer"
                aria-label="Cerrar menú"
              >
                <span className="mobile-close-line mobile-close-line-1" />
                <span className="mobile-close-line mobile-close-line-2" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center gap-4 px-6 pb-20">
              {links.map((l, i) => {
                const active = location.pathname === l.to;
                return (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={closeMenu}
                    className={`mobile-menu-item text-white font-display text-3xl sm:text-4xl tracking-tight cursor-pointer transition-colors duration-300 ${
                      active ? "opacity-100" : "opacity-50 hover:opacity-100"
                    }`}
                    style={{ transitionDelay: `${0.08 + i * 0.06}s` }}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </div>
            <div className="px-6 pb-10">
              <div className="mobile-menu-item text-white/25 text-[10px] tracking-[0.25em] font-mono uppercase">
                Berazategui &bull; Buenos Aires &bull; Argentina
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}