import { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onCartClick: () => void;
  onSearchClick?: () => void;
}

export const Header = ({ onCartClick, onSearchClick }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', href: '#/' },
    { name: 'Boutique', href: '#/shop' },
    { name: 'Services', href: '#/services' },
    { name: 'Contact', href: '#/contact' },
  ];

  return (
    <>
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' : 'bg-white py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Menu Mobile Button */}
            <button
              className="md:hidden p-2 hover:bg-stone-100 rounded-full transition-colors text-ankara-brown"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Ouvrir le menu"
            >
              <Menu size={28} />
            </button>

            {/* Logo */}
            <div className="flex-1 md:flex-none text-center md:text-left">
              <a href="#/" className="inline-block group">
                {/* Dégradé mis à jour : du Brun vers le Doré */}
                <h1 className="text-3xl md:text-5xl font-allura bg-gradient-to-r from-ankara-brown to-ankara-gold bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-105">
                  Ankara by K
                </h1>
              </a>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-stone-700 font-medium tracking-wide hover:text-ankara-brown transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="absolute inset-x-0 bottom-[-4px] h-0.5 bg-ankara-brown transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-2 md:space-x-5">
              <button
                onClick={onSearchClick}
                className="p-2 text-stone-700 hover:text-ankara-gold hover:bg-stone-50 rounded-full transition-all"
                aria-label="Rechercher"
              >
                <Search size={22} />
              </button>

              <button
                onClick={onCartClick}
                className="group relative p-2 text-stone-700 hover:text-ankara-brown transition-all"
                aria-label="Panier"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-ankara-brown text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                className="hidden sm:block p-2 text-stone-700 hover:text-ankara-brown transition-all"
                aria-label="Mon compte"
              >
                <User size={22} />
              </button>
            </div>
          </div>
        </div>

        {/* Marquee (La bande qui était redevenue blanche) */}
        <div className="bg-ankara-brown text-white overflow-hidden py-1.5 border-t border-white/10">
          <div className="flex whitespace-nowrap animate-marquee font-roboto text-xs uppercase tracking-[0.2em]">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <span className="mx-8">Nouvelle collection disponible</span>
                <span className="text-ankara-gold opacity-50">•</span>
                <span className="mx-8">Livraison partout</span>
                <span className="text-ankara-gold opacity-50">•</span>
                <span className="mx-8">Ankara By K</span>
                <span className="text-ankara-gold opacity-50">•</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 z-[100] transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div 
          className={`absolute left-0 top-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <h2 className="text-3xl font-allura text-ankara-brown">Menu</h2>
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="p-2 hover:bg-stone-50 rounded-full"
            >
              <X size={28} className="text-stone-500" />
            </button>
          </div>

          <nav className="p-6 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="py-4 text-xl font-roboto text-stone-800 border-b border-stone-50 hover:pl-2 hover:text-ankara-brown transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </>
  );
};