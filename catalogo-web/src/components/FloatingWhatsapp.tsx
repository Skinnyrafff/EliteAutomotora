"use client";

import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa"; // npm install react-icons

export default function FloatingWhatsapp() {
  return (
    <Link
      href="https://wa.me/56912345678" // <-- cambia por tu número con código de país
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 bg-green-500 rounded-full shadow-lg hover:bg-green-600 transition-colors"
    >
      <FaWhatsapp className="text-white text-3xl" />
    </Link>
  );
}
