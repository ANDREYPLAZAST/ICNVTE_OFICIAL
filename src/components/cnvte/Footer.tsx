import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image 
                src="/media/logo.png" 
                alt="V-CNVTE Logo" 
                width={120} 
                height={120} 
                className="object-contain"
              />
              <span className="text-2xl font-bold">V-CNVTE</span>
            </div>
            <p className="text-slate-300 mb-4 max-w-md">
              Competencia Nacional de vehiculos de tracción eléctrica. 
            </p>
            <div className="text-sm text-slate-400">
              Universidad Militar Nueva Granada
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {[
                { name: 'Inicio', href: '/' },
                { name: 'IV-CNVTE', href: '/iv-cnvte' },
                { name: 'Galería', href: '/gallery' },
                { name: 'Reglamento', href: '/reglamento' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-slate-300 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300">cnvte@unimilitar.edu.co</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-slate-300">+57 310 809 0139</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-blue-400 mt-1" />
                <span className="text-slate-300">
                  Carrera 11 No. 101-80<br />
                  Bogotá, Colombia
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-slate-400 text-sm">
            © 2025 Universidad Militar Nueva Granada. Todos los derechos reservados.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-blue-400 text-sm transition-colors">
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}