import './globals.css';
import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Soporte Informático - SGE',
  description: 'Gestión de inventario y soporte IT',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-24">
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="rounded-lg"
                />
                <span className="font-bold text-white text-xxl">Soporte Informático</span>
              </div>
              <ul className="hidden md:flex gap-8 list-none margin-0 padding-0">
                <li><Link href="/" className="text-blue-100 hover:text-white font-medium transition-colors text-xl">Panel</Link></li>
                <li><Link href="/inventario" className="text-blue-100 hover:text-white font-medium transition-colors text-xl">Inventario</Link></li>
                <li><Link href="/asignaciones" className="text-blue-100 hover:text-white font-medium transition-colors text-xl">Asignaciones</Link></li>
                <li><Link href="/soporte" className="text-blue-100 hover:text-white font-medium transition-colors text-xl">Soporte</Link></li>
                <li><Link href="/empleados" className="text-blue-100 hover:text-white font-medium transition-colors text-xl">Empleados</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
