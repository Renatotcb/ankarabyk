import { useState } from 'react';
import { X, CreditCard, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PaymentModal = ({ isOpen, onClose }: PaymentModalProps) => {
  const { cart, cartTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'card'>('momo');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsProcessing(true);

    try {
      // On prépare les données SANS la colonne 'payment_method' qui bloque
      const orderData = {
        customer_name: formData.name, // Si erreur ici, remplace par 'name'
        customer_email: formData.email, // Si erreur ici, remplace par 'email'
        customer_phone: formData.phone, // Si erreur ici, remplace par 'phone'
        total_amount: cartTotal,
        status: 'pending',
        items: JSON.stringify(cart.map((item) => ({
          product_name: item.product.name,
          quantity: item.quantity,
          size: item.size,
          price: item.product.price,
        }))),
      };

      const { error: insertError } = await supabase
        .from('orders')
        .insert([orderData]);

      if (insertError) throw insertError;

      alert('Commande enregistrée avec succès !');
      clearCart();
      onClose();
    } catch (err: any) {
      // On affiche l'erreur précise pour savoir quelle colonne bloquerait encore
      setError(`Erreur : ${err.message}`);
      console.error('Détails:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-stone-800 tracking-tight">Paiement</h2>
          <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full text-stone-500">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-stone-50 p-5 rounded-xl border border-stone-100 text-center">
            <p className="text-sm text-stone-500 mb-1 font-medium">Total à régler</p>
            <p className="text-3xl font-black text-[#1a2e26]">
              {cartTotal.toLocaleString()} FCFA
            </p>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-stone-700 uppercase tracking-wider text-xs">
              Méthode de paiement
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('momo')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'momo' ? 'border-[#1a2e26] bg-[#1a2e26]/5 text-[#1a2e26]' : 'border-stone-200 text-stone-400'
                }`}
              >
                <Smartphone size={24} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Mobile Money</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                  paymentMethod === 'card' ? 'border-[#1a2e26] bg-[#1a2e26]/5 text-[#1a2e26]' : 'border-stone-200 text-stone-400'
                }`}
              >
                <CreditCard size={24} />
                <span className="text-[10px] font-bold uppercase tracking-tighter">Carte Bancaire</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nom complet"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#1a2e26] outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#1a2e26] outline-none"
            />
            <input
              type="tel"
              placeholder="Numéro de téléphone"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-[#1a2e26] outline-none"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-[#1a2e26] text-white py-4 rounded-xl font-bold shadow-lg disabled:bg-stone-300 active:scale-95 transition-all"
          >
            {isProcessing ? 'Enregistrement...' : 'Confirmer la commande'}
          </button>
        </form>
      </div>
    </div>
  );
};