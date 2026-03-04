import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { 
  Phone, 
  Mail, 
  Package, 
  Calendar, 
  MessageCircle, 
  RefreshCcw,
  Clock
} from 'lucide-react';

export const AdminOrders = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error("Erreur Supabase:", error.message);
    } else {
      // On transforme les items de JSON string vers Objet JS si nécessaire
      const formattedData = data?.map(order => ({
        ...order,
        items: typeof order.items === 'string' ? JSON.parse(order.items) : order.items
      }));
      setOrders(formattedData || []);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-4 md:p-8 pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-[#1a2e26] tracking-tight">Commandes Reçues</h1>
            <p className="text-stone-500 text-sm mt-1">Gérez vos ventes et contacts clients</p>
          </div>
          <button 
            onClick={fetchOrders}
            disabled={loading}
            className="p-3 hover:bg-white hover:shadow-md rounded-2xl transition-all bg-stone-100 text-[#1a2e26] disabled:opacity-50"
          >
            <RefreshCcw size={22} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
        
        <div className="grid gap-8">
          {orders.length === 0 && !loading ? (
            <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-stone-200">
              <Package size={48} className="mx-auto text-stone-300 mb-4" />
              <p className="text-stone-400 font-medium">Aucune commande enregistrée pour le moment.</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-stone-100 hover:shadow-xl transition-shadow duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">Client</span>
                    <h3 className="text-2xl font-bold text-stone-800">{order.customer_name}</h3>
                    <div className="flex items-center gap-4 mt-2">
                       <p className="text-stone-400 text-xs flex items-center gap-1.5 font-medium bg-stone-50 px-2 py-1 rounded-md">
                        <Calendar size={13} /> {new Date(order.created_at).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-stone-400 text-xs flex items-center gap-1.5 font-medium bg-stone-50 px-2 py-1 rounded-md">
                        <Clock size={13} /> {new Date(order.created_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-2">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      order.status === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-green-50 text-green-600 border border-green-100'
                    }`}>
                      {order.status === 'pending' ? 'À traiter' : 'Payé'}
                    </span>
                    <p className="text-xs text-stone-400 font-mono">ID: #{order.id.slice(0,8)}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <a href={`tel:${order.customer_phone}`} className="flex items-center gap-4 text-[#1a2e26] font-bold bg-stone-50 p-4 rounded-2xl hover:bg-[#1a2e26] hover:text-white transition-all group border border-stone-100">
                    <div className="p-2 bg-white rounded-lg group-hover:bg-white/20">
                      <Phone size={18} />
                    </div>
                    {order.customer_phone}
                  </a>
                  <div className="flex items-center gap-4 text-stone-600 bg-stone-50 p-4 rounded-2xl border border-stone-100">
                    <div className="p-2 bg-white rounded-lg">
                      <Mail size={18} />
                    </div>
                    <span className="truncate">{order.customer_email || 'Pas d\'email'}</span>
                  </div>
                </div>

                <div className="bg-stone-50/50 rounded-2xl p-6 border border-stone-100">
                  <h4 className="text-[10px] font-black text-stone-400 uppercase mb-4 tracking-widest flex items-center gap-2">
                    <Package size={14} /> Contenu de la commande
                  </h4>
                  <div className="space-y-3">
                    {Array.isArray(order.items) && order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between items-center text-sm border-b border-stone-100 pb-2 last:border-0">
                        <div className="flex flex-col">
                          <span className="text-stone-800 font-bold">
                            {item.product_name || item.name}
                          </span>
                          <span className="text-stone-400 text-xs">
                            Taille: {item.size} — Qté: {item.quantity}
                          </span>
                        </div>
                        <span className="font-bold text-stone-900">
                          {(item.price * item.quantity).toLocaleString()} FCFA
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t-2 border-white flex justify-between items-center">
                    <span className="text-stone-500 text-sm font-bold uppercase tracking-tight">Total payé</span>
                    <span className="text-2xl font-black text-[#1a2e26]">
                      {Number(order.total_amount).toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
                
                <button 
                  onClick={() => window.open(`https://wa.me/${order.customer_phone.replace(/\D/g, '')}`)}
                  className="mt-6 w-full bg-[#1a2e26] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:shadow-xl active:scale-[0.98] transition-all"
                >
                  <MessageCircle size={22} /> Contacter le client sur WhatsApp
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;