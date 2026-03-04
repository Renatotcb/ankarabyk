import React, { useState, useEffect } from 'react';
import { Search, RotateCcw, ShoppingBag, Loader2 } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductModal } from '../components/ProductModal';
// Importez vos données locales ici (vérifiez le chemin du fichier)
import { ALL_PRODUCTS } from '../data/products'; 
import { Product } from '../types';

export const Shop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [selectedGamme, setSelectedGamme] = useState<string>('all');
  const [selectedFabric, setSelectedFabric] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Utilisation des données locales au lieu de Supabase
  useEffect(() => {
    setLoading(true);
    // On simule un léger chargement pour l'effet visuel
    setTimeout(() => {
      setProducts(ALL_PRODUCTS);
      setFilteredProducts(ALL_PRODUCTS);
      setLoading(false);
    }, 500);
  }, []);

  // Logique de filtrage (reste inchangée mais s'applique sur vos données)
  useEffect(() => {
    let filtered = [...products];
    if (selectedGamme !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedGamme);
    }
    if (selectedFabric !== 'all') {
      filtered = filtered.filter((p) => p.fabric_type === selectedFabric);
    }
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((p) => 
        (p.name?.toLowerCase() || '').includes(query) ||
        (p.description?.toLowerCase() || '').includes(query)
      );
    }
    setFilteredProducts(filtered);
  }, [selectedGamme, selectedFabric, searchQuery, products]);

  const resetFilters = () => {
    setSelectedGamme('all');
    setSelectedFabric('all');
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="container mx-auto px-4">
        
        <header className="mb-12 text-center">
          <h1 className="text-6xl md:text-8xl font-allura text-ankara-green mb-4">
            La Boutique
          </h1>
          <p className="text-gray-500 font-light italic">
            "Vos créations exclusives Ankarabyk"
          </p>
        </header>

        {/* Barre de recherche et filtres */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-stone-50 p-4 rounded-2xl border border-stone-100 shadow-sm">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input 
                type="text"
                placeholder="Rechercher un modèle..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-ankara-gold outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={selectedGamme}
                onChange={(e) => setSelectedGamme(e.target.value)}
                className="p-3 border border-stone-200 rounded-xl bg-white text-sm outline-none"
              >
                <option value="all">Toutes les Gammes</option>
                <option value="Gamme Prestige">Gamme Prestige</option>
                <option value="Gamme Élégance">Gamme Élégance</option>
                <option value="Gamme Tendance">Gamme Tendance</option>
                <option value="Gamme Accessibilité">Gamme Accessibilité</option>
              </select>

              <select
                value={selectedFabric}
                onChange={(e) => setSelectedFabric(e.target.value)}
                className="p-3 border border-stone-200 rounded-xl bg-white text-sm outline-none"
              >
                <option value="all">Tous les Tissus</option>
                <option value="Wax">Wax</option>
                <option value="Batik">Batik</option>
                <option value="Ankara">Ankara</option>
                <option value="Adiré">Adiré</option>
              </select>

              {(selectedGamme !== 'all' || selectedFabric !== 'all' || searchQuery !== '') && (
                <button onClick={resetFilters} className="text-red-500 font-bold px-4 flex items-center gap-2">
                  <RotateCcw size={14} /> Effacer
                </button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-ankara-gold mb-4" size={48} />
            <p className="text-stone-500">Chargement de votre collection...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => setSelectedProduct(product)}
                onQuickView={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-32 bg-stone-50 rounded-3xl border-2 border-dashed border-stone-200">
            <ShoppingBag className="mx-auto text-stone-200 mb-4" size={64} />
            <h3 className="text-xl font-bold text-stone-800">Aucun produit trouvé</h3>
            <button onClick={resetFilters} className="mt-6 text-ankara-gold font-bold underline">
              Voir tout le catalogue
            </button>
          </div>
        )}
      </div>

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

export default Shop;