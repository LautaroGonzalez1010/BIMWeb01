import { useEffect, useState } from "react";

const PHONE = "5491123456789"; // Reemplazá por tu número
const MESSAGE = encodeURIComponent(
  "¡Hola! Me gustaría consultar por un proyecto de arquitectura."
);

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={`https://wa.me/${PHONE}?text=${MESSAGE}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
  className={`
  fixed
  bottom-6
  right-5
  md:bottom-8
  md:right-8
  z-[999]
  w-14
  h-14
  md:w-16
  md:h-16
  rounded-full
  bg-[#25D366]
  text-white
  shadow-xl
  flex
  items-center
  justify-center
  transition-all
  duration-300
  ease-out
  hover:scale-110
  active:scale-95
  ${
    visible
      ? "opacity-100 translate-y-0 pointer-events-auto"
      : "opacity-0 translate-y-4 pointer-events-none"
  }
`}
    >
      <i className="ri-whatsapp-line text-[30px] md:text-[34px]"></i>
    </a>
  );
}