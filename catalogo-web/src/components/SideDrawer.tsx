"use client";

import Link from "next/link";
import Image from "next/image";

const nav = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Comprar" },
  { href: "/vender", label: "Vender" },
  { href: "/servicios/revision-tecnica", label: "Revisión Técnica" },
  { href: "/servicios/mantencion", label: "Mantención" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function SideDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        className={`fixed left-0 top-0 z-50 h-dvh w-[82%] max-w-sm bg-[#111] border-r border-white/10 p-4 transition-transform ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-3">
            <Image
              src="/logo-elite.svg"
              alt="ELITE Automotora"
              width={28}
              height={28}
              className="shrink-0"
            />
            <span className="text-lg font-bold tracking-wide">
              ELITE <span className="text-white/70">AUTOMOTORA</span>
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar menú"
            className="p-2 rounded-lg hover:bg-white/5"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <nav className="space-y-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="block rounded-lg px-3 py-2 text-[15px] text-white/90 hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
