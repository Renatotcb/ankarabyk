import { useState, useEffect } from 'react';
import { MessageCircle, ArrowRight, Quote } from 'lucide-react';
import { Product, Testimonial } from '../types';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
import { ALL_PRODUCTS } from '../data/products';

export const Home = () => {
  const [featuredProducts] = useState<Product[]>(
    ALL_PRODUCTS.filter(p => p.featured).slice(0, 5)
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials: Testimonial[] = [
    { id: '1', name: 'Rénato TCHOBO', message: "La qualité des tissus Batik est exceptionnelle. Une finition parfaite !", rating: 5 },
    { id: '2', name: 'Donatien AKLA', message: "Des tenues modernes qui respectent nos traditions. Je recommande vivement.", rating: 5 },
    { id: '3', name: 'Amelée RODNY', message: "Le service client est au top et les vêtements tombent impeccablement.", rating: 5 },
    { id: '4', name: 'Mme FADONOUGBO', message: "Mon ensemble Wax Premium a fait sensation lors de mon événement.", rating: 5 },
    { id: '5', name: 'M. Romaric', message: "Prêt-à-porter de luxe avec une identité africaine forte. Bravo !", rating: 5 },
    { id: '6', name: 'Raissa', message: "Les couleurs sont encore plus belles en vrai que sur les photos !", rating: 5 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const whatsappUrl = 'https://wa.me/22964830195?text=Bonjour Ankara By K, je souhaite commander.';

  return (
    <div className="overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden pt-12 lg:pt-0">
        <div className="absolute top-0 right-0 w-1/4 h-full bg-ankara-bg -z-10 hidden lg:block"></div>
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="z-10 text-center lg:text-left order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ankara-gold/10 text-ankara-gold font-bold text-xs mb-6 uppercase tracking-widest border border-ankara-gold/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ankara-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ankara-gold"></span>
                </span>
                Prêt-à-porter de luxe
              </div>
              
              <h1 className="text-5xl md:text-8xl font-allura text-ankara-dark mb-6 leading-[1.1]">
                Bienvenue chez <br />
                <span className="text-ankara-brown">Ankara by K</span>
              </h1>
              
              <p className="text-lg md:text-xl text-stone-600 mb-10 font-roboto font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
                L'élégance africaine réinventée. Découvrez nos collections uniques en Batik, Wax et Adiré.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                {/* --- CORRECTION ICI : href="#/shop" --- */}
                <a href="#/shop" className="group bg-ankara-brown text-white px-10 py-4 rounded-full font-bold hover:opacity-90 transition-all duration-300 shadow-xl flex items-center justify-center gap-3">
                  Découvrir la boutique
                  <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </a>
                
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="group border-2 border-ankara-brown text-ankara-brown px-10 py-4 rounded-full font-bold hover:bg-ankara-brown hover:text-white transition-all duration-300 flex items-center justify-center gap-3">
                  <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative group w-72 h-72 md:w-[450px] md:h-[450px]">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-ankara-gold opacity-50 group-hover:rotate-180 transition-transform duration-1000"></div>
                <div className="absolute inset-4 rounded-full overflow-hidden border-8 border-white shadow-2xl transition-all duration-500 group-hover:scale-105">
                  <img
                    src="https://i.ibb.co/cSPLdbd2/image.png"
                    alt="Hero"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LES 5 INCONTOURNABLES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-2 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-6xl font-allura text-ankara-brown">Nos Incontournables</h2>
            <div className="h-1 w-16 bg-ankara-gold mx-auto mt-2"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="transform scale-[0.95] md:scale-100 origin-top">
                <ProductCard
                  product={product}
                  onAddToCart={() => setSelectedProduct(product)}
                  onQuickView={() => setSelectedProduct(product)}
                />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            {/* --- CORRECTION ICI AUSSI : href="#/shop" --- */}
            <a href="#/shop" className="inline-flex items-center gap-2 bg-ankara-brown text-white px-8 py-3 rounded-full hover:opacity-90 transition-colors font-bold shadow-lg">
              Voir toute la collection <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION TÉMOIGNAGES */}
      <section className="py-24 bg-ankara-brown text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-allura text-center mb-16">Témoignages</h2>
          <div className="max-w-3xl mx-auto bg-white rounded-3xl p-10 shadow-2xl text-ankara-dark text-center">
            <Quote className="text-ankara-gold mx-auto mb-4" size={40} />
            <p className="text-xl italic mb-6">"{testimonials[currentTestimonial]?.message}"</p>
            <p className="text-ankara-brown font-bold text-2xl">{testimonials[currentTestimonial]?.name}</p>
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentTestimonial(i)} 
                  className={`h-2 rounded-full transition-all ${i === currentTestimonial ? 'w-8 bg-ankara-brown' : 'w-2 bg-stone-300'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CTA FINAL */}
      <section className="py-20 bg-ankara-brown text-white text-center relative overflow-hidden border-t border-white/10">
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-5xl md:text-7xl font-allura text-ankara-gold mb-6">Prêt à rayonner ?</h2>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light opacity-90">
            Portez l'héritage, affirmez votre style. Nos pièces uniques n'attendent que vous.
          </p>
          {/* --- CORRECTION ICI AUSSI : href="#/shop" --- */}
          <a href="#/shop" className="inline-block bg-ankara-gold text-white px-12 py-5 rounded-full font-bold hover:bg-white hover:text-ankara-brown hover:scale-105 transition-all shadow-2xl">
            VOIR LA BOUTIQUE
          </a>
        </div>
      </section>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};