// src/components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import { Instagram } from 'lucide-react';
import { FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src="/logo-blanco.png"
                alt="ELITE Automotora"
                width={64}
                height={64}
              />
              <span className="text-xl font-semibold">ELITE AUTOMOTORA</span>
            </Link>
            <p className="text-neutral-400 text-sm">
              Nos dedicamos al servicio integral automotor. Comprometidos con brindar una experiencia eficiente.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="https://www.instagram.com/eliteautomotora.cl/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="https://www.tiktok.com/@elite_automotora" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white">
                <FaTiktok size={24} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Elite Automotora</h3>
            <ul>
              <li><Link href="/catalogo" className="text-neutral-400 hover:text-white">Comprar un auto</Link></li>
              <li><Link href="/vender" className="text-neutral-400 hover:text-white">Vende tu auto</Link></li>
              
              <li><Link href="#" className="text-neutral-400 hover:text-white">Nosotros</Link></li>
            </ul>
          </div>

          

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="text-neutral-400 space-y-2">
              <li>+56 9 3333 8281</li>
              <li>contacto.eliteautomotora@gmail.com</li>
              <li>El director 6000, Las Condes</li>
            </ul>
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500">
          <p>Elite Automotora 2025 © Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span>Diseñado por Rafael Figueroa</span>
            {/* <Image src="/visa.svg" alt="Visa" width={40} height={25} /> */}
            {/* <Image src="/mastercard.svg" alt="Mastercard" width={40} height={25} /> */}
          </div>
        </div>
      </div>
    </footer>
  );
}