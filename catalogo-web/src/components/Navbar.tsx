"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: "Inicio", href: "/" },
    { label: "Compra", href: "/catalogo" },
    { label: "Vender", href: "/vender" },
    { label: "Nosotros", href: "/nosotros" },
  ];

  const base =
    "px-0 py-3 text-[16px] md:text-[18px] leading-none text-white hover:text-neutral-200 transition-colors focus:outline-none focus-visible:outline-none";
  const active = "text-[#BC281D]";

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/70 shadow-[0_2px_10px_rgba(0,0,0,.25)]">
      {/* Contenedor principal */}
      <div className="mx-auto flex h-[100px] md:h-[120px] max-w-[1300px] items-center justify-between px-4 md:px-6">
        {/* Logo + nombre */}
        <Link href="/" className="flex items-center gap-3 focus:outline-none">
          <Image
            src="/logo-blanco.png"
            alt="ELITE Automotora"
            width={72}
            height={72}
            className="h-[48px] w-[48px] md:h-[64px] md:w-[64px]"
            priority
          />
          <span className="hidden sm:block text-[18px] md:text-[20px] font-semibold tracking-wide">
            ELITE AUTOMOTORA
          </span>
        </Link>

        {/* Menú desktop */}
        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <Link
              key={l.href + l.label}
              href={l.href}
              className={`${base} ${pathname === l.href ? active : ""}`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="rounded-full border border-[#BC281D] px-6 py-2.5 text-[17px] text-white hover:bg-[#BC281D] hover:text-white transition-colors focus:outline-none focus-visible:outline-none"
          >
            Contacto
          </Link>
        </div>

        {/* Botón mobile */}
        <button
          aria-label="Abrir menú"
          className="md:hidden text-white focus:outline-none focus-visible:outline-none"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Panel mobile desplegable */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-black/95">
          <div className="mx-auto max-w-[1300px] px-4 py-4 flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href + l.label}
                href={l.href}
                className={`block py-2 text-[16px] ${pathname === l.href ? active : "text-white"} hover:text-neutral-200 focus:outline-none focus-visible:outline-none`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}

            <Link
              href="#contacto"
              className="mt-2 inline-block rounded-full border border-[#BC281D] px-6 py-2.5 text-[17px] text-white hover:bg-[#BC281D] hover:text-white focus:outline-none focus-visible:outline-none"
              onClick={() => setOpen(false)}
            >
              Contacto
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
