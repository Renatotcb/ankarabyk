import React, { useState } from 'react';
import { Mail, Phone, Instagram, Facebook, MessageCircle, Send, CheckCircle2, Globe, Clock } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi professionnel
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitStatus('success');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setSubmitStatus(null), 5000);
  };

  // Liens officiels Ankara by K
  const socialLinks = {
    whatsapp: 'https://wa.me/22901648301195',
    instagram: 'https://instagram.com/ankarabyk', // À adapter avec ton vrai handle
    facebook: 'https://facebook.com/ankarabyk',   // À adapter avec ton vrai handle
    tiktok: 'https://tiktok.com/@ankarabyk'       // Optionnel
  };

  return (
    <div className="min-h-screen bg-white selection:bg-ankara-gold/30">
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-[40vh] bg-ankara-dark flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-7xl md:text-9xl font-allura text-ankara-gold mb-4 animate-in fade-in zoom-in duration-700">
            Nous Joindre
          </h1>
          <div className="h-1 w-24 bg-ankara-gold mx-auto rounded-full"></div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-20 relative z-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- CARTE 1 : DIRECT CONTACT --- */}
          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-stone-100 flex flex-col items-center text-center group hover:border-ankara-gold transition-all duration-500">
            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-ankara-green mb-6 group-hover:bg-ankara-green group-hover:text-white transition-all">
              <Phone size={32} />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Appelez-nous</h3>
            <p className="text-xl font-bold text-ankara-dark">+229 01 64 83 01 95</p>
            <p className="text-sm text-gray-500 mt-2 italic">Disponible pour vos commandes</p>
          </div>

          {/* --- CARTE 2 : WHATSAPP (LE PLUS IMPORTANT) --- */}
          <div className="bg-ankara-green p-10 rounded-[40px] shadow-2xl flex flex-col items-center text-center transform lg:scale-110 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-ankara-green mb-6 shadow-lg group-hover:rotate-12 transition-transform">
              <MessageCircle size={32} />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-ankara-gold mb-2">Chat Direct</h3>
            <p className="text-xl font-bold text-white mb-4">Conseil Stylisme WhatsApp</p>
            <a 
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ankara-gold text-ankara-dark px-8 py-3 rounded-full font-bold text-sm hover:bg-white transition-all"
            >
              Discuter maintenant
            </a>
          </div>

          {/* --- CARTE 3 : EMAIL --- */}
          <div className="bg-white p-10 rounded-[40px] shadow-xl border border-stone-100 flex flex-col items-center text-center group hover:border-ankara-gold transition-all duration-500">
            <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-ankara-green mb-6 group-hover:bg-ankara-green group-hover:text-white transition-all">
              <Mail size={32} />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2">Email</h3>
            <p className="text-lg font-bold text-ankara-dark">ankarabyk6@gmail.com</p>
            <p className="text-sm text-gray-500 mt-2 italic">Réponse sous 24h</p>
          </div>
        </div>

        {/* --- SECTION FORMULAIRE & RÉSEAUX --- */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-start max-w-6xl mx-auto">
          
          {/* GAUCHE : RÉSEAUX ET INFOS */}
          <div className="space-y-12">
            <div>
              <h2 className="text-5xl font-allura text-ankara-green mb-6">L'Atelier Ankara by K</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Que ce soit pour une personnalisation de modèle, une question sur nos gammes 
                **Prestige** ou **Élégance**, ou simplement pour partager votre passion du Wax, 
                nous sommes à votre écoute.
              </p>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-ankara-dark uppercase tracking-widest text-xs">Suivez notre actualité</h4>
              <div className="flex gap-4">
                <a href={socialLinks.instagram} className="flex items-center gap-3 bg-stone-50 px-6 py-4 rounded-2xl hover:bg-ankara-gold hover:text-white transition-all font-bold">
                  <Instagram size={20} /> Instagram
                </a>
                <a href={socialLinks.facebook} className="flex items-center gap-3 bg-stone-50 px-6 py-4 rounded-2xl hover:bg-ankara-gold hover:text-white transition-all font-bold">
                  <Facebook size={20} /> Facebook
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 p-8 bg-stone-50 rounded-[32px] border border-stone-100">
               <div className="text-ankara-gold"><Clock size={32} /></div>
               <div>
                  <h4 className="font-bold text-ankara-dark">Heures de Réception</h4>
                  <p className="text-sm text-gray-500">Lun - Sam : 09h à 18h / Dim : 10h à 16h</p>
               </div>
            </div>
          </div>

          {/* DROITE : LE FORMULAIRE LUXE */}
          <div className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-2xl relative">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <input
                  type="text"
                  required
                  placeholder="Votre Nom"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-ankara-gold outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <input
                  type="email"
                  required
                  placeholder="Votre Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-ankara-gold outline-none transition-all"
                />
              </div>

              <div className="space-y-1">
                <textarea
                  required
                  rows={4}
                  placeholder="Comment pouvons-nous vous aider ?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-stone-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-ankara-gold outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-ankara-dark text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-4 hover:bg-black transition-all shadow-xl shadow-black/10"
              >
                {isSubmitting ? "Transmission..." : "Envoyer le message"}
                {!isSubmitting && <Send size={20} className="text-ankara-gold" />}
              </button>

              {submitStatus === 'success' && (
                <div className="flex items-center gap-3 bg-green-50 text-green-700 p-4 rounded-2xl animate-in fade-in zoom-in text-sm font-medium">
                  <CheckCircle2 size={18} />
                  Merci ! Votre demande a été transmise à notre équipe.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;