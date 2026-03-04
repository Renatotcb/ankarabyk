import { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { PaymentModal } from './components/PaymentModal';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { AdminOrders } from './pages/AdminOrders';

function App() {
  const [currentPage, setCurrentPage] = useState('/');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  useEffect(() => {
    const handleNavigation = () => {
      // On récupère ce qui est après le # (ex: #/shop -> /shop)
      let path = window.location.hash.slice(1) || '/';
      
      // Normalisation du chemin pour éviter les erreurs de switch
      if (path !== '/' && !path.startsWith('/')) {
        path = '/' + path;
      }
      
      setCurrentPage(path);
      
      // On remonte en haut de page à chaque changement de vue
      window.scrollTo(0, 0);
      
      // Vérification spécifique pour l'accès admin
      if (path === '/admin-ankara-by-k' && !isAdminAuthenticated) {
        checkAdminAccess();
      }
    };

    // Écouteur pour les changements d'URL (clics sur les liens #/...)
    window.addEventListener('hashchange', handleNavigation);
    
    // Appel initial au chargement
    handleNavigation();

    return () => window.removeEventListener('hashchange', handleNavigation);
  }, [isAdminAuthenticated]);

  const checkAdminAccess = () => {
    const password = prompt("Accès restreint. Veuillez entrer le code administrateur :");
    if (password === 'Amelée2026') {
      setIsAdminAuthenticated(true);
    } else {
      alert("Code incorrect. Accès refusé.");
      window.location.hash = '/'; // Redirection vers l'accueil
    }
  };

  // Système de routage manuel
  const renderPage = () => {
    switch (currentPage) {
      case '/':
        return <Home />;
      case '/shop':
        return <Shop />;
      case '/services':
        return <Services />;
      case '/contact':
        return <Contact />;
      case '/admin-ankara-by-k':
        return isAdminAuthenticated ? <AdminOrders /> : <div className="min-h-screen bg-stone-50" />;
      default:
        return <Home />;
    }
  };

  // Déterminer si on est sur la page admin pour masquer Header/Footer
  const isAdminPage = currentPage === '/admin-ankara-by-k';

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col font-roboto bg-white text-ankara-dark">
        {/* On n'affiche le Header que si on n'est pas sur l'admin */}
        {!isAdminPage && (
          <Header
            onCartClick={() => setIsCartOpen(true)}
            onSearchClick={() => {}} // Optionnel : à implémenter si besoin
          />
        )}

        <main className="flex-1">
          {renderPage()}
        </main>

        {/* On n'affiche le Footer que si on n'est pas sur l'admin */}
        {!isAdminPage && <Footer />}

        {/* Composant Panier Latéral */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => {
            setIsCartOpen(false); // Ferme le panier
            setIsPaymentOpen(true); // Ouvre le formulaire de paiement
          }} 
        />

        {/* Modal de Paiement / Checkout */}
        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;