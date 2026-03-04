import React from 'react';
import { ShoppingCart, MessageCircle, Ban, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
  onQuickView: () => void;
}

export const ProductCard = ({
  product,
  onAddToCart,
  onQuickView,
}: ProductCardProps) => {
  // Détection du stock (Vérifie si inStock est false dans data.ts)
  const isSoldOut = product.inStock === false;

  // Lien WhatsApp avec message personnalisé
  const whatsappMessage = encodeURIComponent(
    `Bonjour Ankara by K, je suis intéressé(e) par l'article : ${product.name} (${product.price.toLocaleString()} FCFA)`
  );
  const whatsappUrl = `https://wa.me/22901648301195?text=${whatsappMessage}`;

  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden transition-all duration-500 hover:shadow-2xl ${
        isSoldOut ? 'opacity-90' : 'hover:-translate-y-1'
      }`}
    >
      {/* --- SECTION IMAGE AVEC BADGE SOLD OUT --- */}
      <div 
        className="relative aspect-[3/4] overflow-hidden cursor-pointer bg-stone-100"
        onClick={onQuickView}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 ${
            !isSoldOut ? 'group-hover:scale-110' : 'grayscale brightness-75'
          }`}
        />

        {/* RUBAN ROUGE "SOLD OUT" (Visible et stylé) */}
        {isSoldOut && (
          <div className="absolute top-0 right-0 overflow-hidden w-32 h-32 z-10">
            <div className="bg-red-600 text-white text-[10px] font-black py-1.5 w-40 text-center uppercase tracking-widest shadow-lg absolute top-6 -right-10 rotate-45 border-y border-white/20">
              Sold Out
            </div>
          </div>
        )}

        {/* BADGE "COUP DE CŒUR" (Uniquement si en stock) */}
        {!isSoldOut && product.featured && (
          <div className="absolute top-3 left-3 bg-[#d4af37] text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1.5">
            <Star size={10} fill="currentColor" /> Favori
          </div>
        )}

        {/* OVERLAY SOMBRE SI SOLD OUT */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        )}
      </div>

      {/* --- SECTION INFOS PRODUIT --- */}
      <div className="p-5">
        <div className="mb-4">
          <h3 className="text-[#1a2e26] font-bold text-lg leading-tight line-clamp-1 italic mb-1">
            {product.name}
          </h3>
          <p className="text-stone-400 text-xs line-clamp-2 min-h-[32px] font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex items-baseline gap-1 mb-6">
          <span className={`text-2xl font-black ${isSoldOut ? 'text-stone-300 line-through' : 'text-[#1a2e26]'}`}>
            {product.price.toLocaleString()}
          </span>
          <span className={`text-[10px] font-bold ${isSoldOut ? 'text-stone-300' : 'text-stone-500'}`}>
            FCFA
          </span>
        </div>

        {/* --- ACTIONS --- */}
        <div className="flex gap-2">
          {/* Bouton Panier / Indisponible */}
          <button
            onClick={!isSoldOut ? onAddToCart : undefined}
            disabled={isSoldOut}
            className={`flex-1 h-12 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all active:scale-95 ${
              isSoldOut 
                ? 'bg-stone-50 text-stone-300 cursor-not-allowed border border-stone-100' 
                : 'bg-[#1a2e26] text-white hover:bg-[#2a443a] shadow-md'
            }`}
          >
            {isSoldOut ? <Ban size={16} /> : <ShoppingCart size={18} />}
            <span>{isSoldOut ? 'Épuisé' : 'Commander'}</span>
          </button>

          {/* Bouton WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 bg-[#25D366] text-white rounded-xl flex items-center justify-center hover:bg-[#20bd5a] hover:shadow-lg transition-all active:scale-95 shadow-md"
            title="Contacter sur WhatsApp"
          >
            <MessageCircle size={20} fill="white" className="text-white" />
          </a>
        </div>
      </div>
    </div>
  );
};