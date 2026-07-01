import { useEffect, useState } from "react";

export default function ScrollTopButton() {
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
        ease-out
        ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
    >
      <i className="ri-arrow-up-line text-2xl leading-none"></i>
    </button>
  );
}