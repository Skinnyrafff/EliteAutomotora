"use client";
import Link from "next/link";
import Image from "next/image";

const items = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Compra" },
  { href: "/vender", label: "Vender" },
  { href: "/servicios/revision-tecnica", label: "Revisión Técnica" },
  { href: "/servicios/mantencion", label: "Mantención" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export default function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {/* overlay */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={onClose}
      />
      {/* panel */}
      <aside
        className={`fixed top-0 left-0 h-dvh w-[82%] max-w-sm bg-[#111] border-r border-white/10 p-4 transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="inline-flex items-center gap-2">
            <Image src="/logo-senna.svg" alt="Senna Motors" width={28} height={28} />
            <span className="font-bold">SENNA <span className="text-white/70">MOTORS</span></span>
          </div>
          <button onClick={onClose} aria-label="Cerrar" className="p-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav className="space-y-1">
          {items.map((it) => (
            <Link key={it.href} href={it.href} onClick={onClose}
              className="block rounded-lg px-3 py-2 text-sm text-white/90 hover:bg-white/5">
              {it.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
