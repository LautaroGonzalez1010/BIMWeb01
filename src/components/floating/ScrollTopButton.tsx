import { useEffect, useState } from "react";
import { useUI } from "@/context/UIContext";

export default function ScrollTopButton() {
  const { overlayOpen } = useUI();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Volver arriba"
      className={`
        fixed
        md:hidden
        bottom-24
        right-6
        z-[999]
        w-12
        h-12
        rounded-full
        bg-brand
        text-white
        shadow-xl
        backdrop-blur-md
        flex
        items-center
        justify-center
        transition-all
        duration-300
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          visible && !overlayOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-90 pointer-events-none"
        }
      `}
    >
      <i className="ri-arrow-up-line text-2xl leading-none"></i>
    </button>
  );
}