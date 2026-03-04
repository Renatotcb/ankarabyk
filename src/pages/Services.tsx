import React from 'react';
import { Scissors, Sparkles, Truck, Heart, Box, Zap, MessageCircle } from 'lucide-react';

export const Services = () => {
  const services = [
    {
      icon: <Scissors size={40} />,
      title: 'Prêt-à-Porter de Luxe',
      description:
        'Une collection exclusive alliant confort et élégance. Chaque pièce est finie à la main pour garantir une qualité irréprochable.',
    },
    {
      icon: <Sparkles size={40} />,
      title: 'Stylisme Personnalisé',
      description:
        'Bénéficiez de conseils d\'experts pour adapter nos modèles à votre morphologie et à vos événements prestigieux.',
    },
    {
      icon: <Truck size={40} />,
      title: 'Livraison Internationale',
      description:
        'Nous expédions vos colis avec soin partout au Bénin et à l\'international avec un suivi en temps réel.',
    },
    {
      icon: <Heart size={40} />,
      title: 'Engagement Qualité',
      description:
        'Satisfaction garantie sur la durabilité de nos tissus (Batik, Wax, Adiré) et l\'éclat des pigments.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* --- SECTION EN-TÊTE --- */}
      <section className="py-20 border-b border-stone-50 bg-stone-50/50">
        <div className="container mx-auto px-4 text-center">
          <span className="text-ankara-gold font-bold tracking-[0.3em] text-xs uppercase mb-4 block">
            L'excellence du savoir-faire
          </span>
          <h1 className="text-6xl md:text-8xl font-allura text-ankara-green mb-6">
            Nos Services
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg font-light italic leading-relaxed">
            "Bien plus qu'une boutique, une célébration de l'élégance africaine et de l'innovation textile."
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        
        {/* --- GRILLE DES SERVICES PRINCIPAUX --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-3xl border border-stone-100 bg-white hover:bg-ankara-green hover:text-white transition-all duration-500 shadow-sm hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="text-ankara-gold mb-6 group-hover:text-white transition-colors">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-ankara-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-stone-100 transition-colors">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* --- SECTION INNOVATION (3D/AR) --- */}
        <div className="mb-24 bg-ankara-dark text-white rounded-[40px] overflow-hidden relative shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-ankara-gold/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
            <div className="p-12 md:p-16">
              <span className="text-ankara-gold font-bold tracking-widest text-xs uppercase">Atelier Digital</span>
              <h2 className="text-5xl md:text-6xl font-allura mt-4 mb-6">Visualisation 3D</h2>
              <p className="text-stone-300 text-lg mb-8 font-light">
                Explorez nos motifs **Batik** et **Adiré** comme jamais auparavant. Notre technologie de visualisation vous permet d'apprécier chaque détail du grain du tissu avant votre achat.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-ankara-gold text-ankara-dark px-8 py-4 rounded-full font-bold hover:bg-white transition-all flex items-center gap-3">
                  <Box size={20} /> Expérience 3D
                </button>
                <button className="border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all flex items-center gap-2">
                  <Zap size={20} /> Essayage Virtuel
                </button>
              </div>
            </div>
            <div className="bg-gradient-to-br from-stone-800 to-ankara-dark h-full min-h-[400px] flex items-center justify-center border-l border-white/5">
              <div className="relative">
                <div className="w-32 h-32 border-2 border-ankara-gold/30 rounded-full animate-ping absolute"></div>
                <div className="w-32 h-32 border-2 border-ankara-gold rounded-full flex items-center justify-center bg-ankara-dark/50 backdrop-blur-sm">
                   <span className="text-ankara-gold font-bold">360°</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- MISSION & VALEURS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative">
             <div className="absolute -left-4 -top-4 w-24 h-24 bg-ankara-green/10 rounded-full"></div>
             <h2 className="text-5xl font-allura text-ankara-green mb-8 relative">Notre Mission Culturelle</h2>
             <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
                <p>
                  **Ankara by K** n'est pas qu'une marque, c'est un pont entre les générations. Nous nous engageons à préserver les techniques ancestrales du **Batik** et de l'**Adiré**.
                </p>
                <p className="italic border-l-4 border-ankara-gold pl-6">
                  "Chaque vêtement raconte une histoire, chaque motif est un symbole de fierté et d'élégance intemporelle."
                </p>
             </div>
          </div>
          
          <div className="bg-stone-50 p-10 rounded-[40px] border border-stone-100">
             <h3 className="text-2xl font-bold text-ankara-dark mb-6">Conseils d'Entretien</h3>
             <ul className="space-y-4">
                {[
                  { t: 'Lavage', d: 'À la main, eau froide pour préserver les pigments naturels.' },
                  { t: 'Séchage', d: 'À l\'ombre uniquement. Le soleil direct ternit le Wax.' },
                  { t: 'Repassage', d: 'Toujours sur l\'envers à température moyenne.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="text-ankara-gold font-bold">0{i+1}.</span>
                    <p className="text-sm text-gray-600"><strong>{item.t} :</strong> {item.d}</p>
                  </li>
                ))}
             </ul>
          </div>
        </div>

        {/* --- APPEL À L'ACTION FINAL --- */}
        <div className="text-center bg-ankara-green rounded-[40px] p-12 md:p-20 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-allura mb-8">Prêt à porter l'histoire ?</h2>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#/shop" className="bg-white text-ankara-green px-12 py-5 rounded-full font-bold hover:bg-ankara-gold hover:text-ankara-dark transition-all transform hover:scale-105">
                Explorer la Boutique
              </a>
              <a href="https://wa.me/22964830195" className="border-2 border-white/50 text-white px-12 py-5 rounded-full font-bold hover:bg-white hover:text-ankara-green transition-all flex items-center justify-center gap-3">
                <MessageCircle size={22} /> Parler à un Styliste
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Services;