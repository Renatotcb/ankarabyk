import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductModal = ({
  product,
  isOpen,
  onClose,
}: ProductModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleAddToCart = () => {
    addToCart(product, selectedSize);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Bonjour, je suis intéressé(e) par ${product.name} (Taille: ${selectedSize}) à ${product.price.toLocaleString()} FCFA`
  );
  const whatsappUrl = `https://wa.me/22901648301195?text=${whatsappMessage}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-allura text-terracotta">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="text-deep-green hover:text-terracotta transition-colors"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />

              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-colors"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 transition-colors"
                    aria-label="Image suivante"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="flex justify-center gap-2 mt-4">
                {product.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex
                        ? 'bg-terracotta'
                        : 'bg-gray-300'
                    }`}
                    aria-label={`Image ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-700 mb-4">{product.description}</p>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-bold">Catégorie:</span> {product.category}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">Tissu:</span> {product.fabric_type}
                </p>
              </div>

              <p className="text-3xl font-bold text-terracotta mb-6">
                {product.price.toLocaleString()} FCFA
              </p>

              <div className="mb-6">
                <label className="block text-sm font-bold text-deep-green mb-2">
                  Taille:
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                        selectedSize === size
                          ? 'border-terracotta bg-terracotta text-white'
                          : 'border-gray-300 hover:border-terracotta'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleAddToCart}
                  className="w-full bg-terracotta text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-bold"
                >
                  Ajouter au panier
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-deep-green text-white py-3 px-6 rounded-lg hover:bg-opacity-90 transition-colors font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Commander sur WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
