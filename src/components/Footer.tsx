import { Instagram, Facebook, Mail, Phone, MessageCircle } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-ankara-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Section Brand */}
          <div className="space-y-6">
            <h3 className="text-4xl font-allura text-ankara-gold">
              Ankara by K
            </h3>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              L'élégance africaine réinventée. Des pièces uniques en Batik, Wax et Adiré, 
              confectionnées pour sublimer votre quotidien avec audace et authenticité.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.instagram.com/ankara_by_k" 
                target="_blank" 
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-ankara-pink transition-all duration-300 group"
              >
                <Instagram size={20} className="group-hover:scale-110" />
              </a>
              <a 
                href="https://www.facebook.com/share/1C8sUjq2f6/" 
                target="_blank" 
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 group"
              >
                <Facebook size={20} className="group-hover:scale-110" />
              </a>
              <a 
                href="https://www.tiktok.com/@ankara_by_k" 
                target="_blank" 
                className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 group"
              >
                <span className="font-bold text-sm group-hover:scale-110">Tk</span>
              </a>
            </div>
          </div>

          {/* Section Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-ankara-gold/30 pb-2 inline-block">
              Navigation
            </h4>
            <ul className="space-y-4">
              {['Accueil', 'Boutique', 'Services', 'Contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={item === 'Accueil' ? '/' : `/${item.toLowerCase()}`} 
                    className="text-stone-400 hover:text-ankara-gold transition-colors flex items-center group"
                  >
                    <span className="h-[1px] w-0 bg-ankara-gold mr-0 group-hover:w-4 group-hover:mr-2 transition-all"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Section Contact & Infos */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-ankara-gold/30 pb-2 inline-block">
              Contactez-nous
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-stone-400">
                <Phone size={18} className="text-ankara-gold shrink-0" />
                <a href="tel:0164830195" className="hover:text-white transition-colors">01 64 83 01 95</a>
              </li>
              <li className="flex items-start space-x-3 text-stone-400">
                <Mail size={18} className="text-ankara-gold shrink-0" />
                <a href="mailto:ankarabyk6@gmail.com" className="hover:text-white transition-colors break-all">
                  ankarabyk6@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-stone-400">
                <MessageCircle size={18} className="text-ankara-gold shrink-0" />
                <a href="https://wa.me/22964830195" target="_blank" className="hover:text-white transition-colors">
                  Assistance WhatsApp
                </a>
              </li>
            </ul>
          </div>

          {/* Section Newsletter / Note */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-ankara-gold/30 pb-2 inline-block">
              Notre Engagement
            </h4>
            <p className="text-stone-400 text-sm italic">
              "Porter ANKARA BY K, c'est célébrer l'héritage africain avec une touche de modernité irrésistible."
            </p>
            <div className="mt-6 p-4 bg-stone-800/50 rounded-xl border border-stone-700">
              <p className="text-xs text-ankara-gold font-bold uppercase tracking-wider">Paiements sécurisés</p>
              <p className="text-[10px] text-stone-500 mt-1">MoMo • Carte Bancaire • Virement</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-stone-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-stone-500 text-sm text-center md:text-left">
            <p>&copy; {currentYear} <span className="text-white font-bold">ANKARA BY K</span>. Tous droits réservés.</p>
          </div>
          <div className="flex items-center space-x-1 text-sm">
            <span className="text-stone-500">Propulsé par</span>
            <a href="#" className="text-ankara-gold hover:underline font-medium">
              Rénato TCHOBO
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};