import React from 'react';
import { X, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer = ({ 
  isOpen, 
  onClose, 
  onCheckout 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onCheckout: () => void; 
}) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0" style={{ zIndex: 9999 }}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-stone-800">
            <ShoppingBag /> Mon Panier
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-10 text-stone-400">Votre panier est vide</div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-4">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-800">{item.product.name}</h3>
                    <p className="text-sm text-stone-500 italic">Taille: {item.size}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 border rounded-lg px-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2">-</button>
                        <span className="font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500"><Trash2 size={18} /></button>
                    </div>
                  </div>
                  <div className="font-bold">{(item.product.price * item.quantity).toLocaleString()} FCFA</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-stone-50">
          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span className="text-terracotta">{cartTotal.toLocaleString()} FCFA</span>
          </div>
          <button 
            disabled={cart.length === 0}
            className="w-full bg-[#1a2e26] text-white py-4 rounded-xl font-bold shadow-lg"
            onClick={() => {
              onClose(); // Ferme le panier
              onCheckout(); // Ouvre le paiement
            }}
          >
            Commander maintenant
          </button>
        </div>
      </div>
    </div>
  );
};