// app/layout.tsx
import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingWhatsapp from "@/components/FloatingWhatsapp";

export const metadata = {
  title: "ELITE Automotora",
  description: "Catálogo y venta de vehículos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-black text-white">
        <Navbar />
        {/* compensa altura: 84px (mobile) / 108px (desktop) */}
        <main className="pt-[90px] md:pt-[116px]">{children}</main>
        <FloatingWhatsapp />
      </body>
    </html>
  );
}
