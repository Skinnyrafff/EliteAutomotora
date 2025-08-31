"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  Car,
  DollarSign,
  ClipboardCheck,
  Wrench,
  Users,
  Phone,
} from "lucide-react";

const nav = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/catalogo", label: "Comprar", icon: Car },
  { href: "/vender", label: "Vender", icon: DollarSign },
  {
    href: "/servicios/revision-tecnica",
    label: "Revisión Técnica",
    icon: ClipboardCheck,
  },
  { href: "/servicios/mantencion", label: "Mantención", icon: Wrench },
  { href: "/nosotros", label: "Nosotros", icon: Users },
  { href: "/contacto", label: "Contacto", icon: Phone },
];

export default function SidebarHover() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hotspot invisible en el borde para disparar el hover */}
      <div
        className="fixed left-0 top-0 z-40 hidden h-screen w-2 lg:block"
        onMouseEnter={() => setOpen(true)}
        aria-hidden
      />

      <aside
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`
          fixed left-0 top-0 z-40 hidden h-screen bg-[#111] border-r border-white/10
          transition-all duration-300 ease-in-out lg:block
          ${open ? "w-64" : "w-16"}
        `}
      >
        {/* Logo / Marca */}
        <div className="flex items-center gap-3 px-3 pt-4 pb-3">
          <Image
            src="/logo-elite.svg"
            alt="ELITE Automotora"
            width={28}
            height={28}
          />
          {open && (
            <span className="text-sm font-bold tracking-wide">
              ELITE <span className="text-white/70">AUTOMOTORA</span>
            </span>
          )}
        </div>

        {/* Navegación */}
        <nav className="mt-2 flex flex-col gap-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="group flex items-center gap-3 px-3 py-2 text-[15px] text-white/90 hover:bg-white/5"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/90">
                <Icon size={18} />
              </span>
              {open && (
                <span className="truncate transition-colors">{label}</span>
              )}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
