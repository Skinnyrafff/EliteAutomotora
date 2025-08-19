"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsapp() {
  return (
    <div className="group fixed bottom-5 right-5 z-50">
      <Link
        href="https://wa.me/56933338281"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </Link>
      <div className="absolute top-1/2 right-16 -translate-y-1/2 transform opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="bg-black text-white text-sm rounded-md px-3 py-2 whitespace-nowrap">
          Hola, necesitas ayuda?
        </span>
        <div className="absolute top-1/2 -right-2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-black transform -translate-y-1/2"></div>
      </div>
    </div>
  );
}
