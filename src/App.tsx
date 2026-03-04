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
      let path = window.location.hash.slice(1) || '/';
      
      if (path !== '/' && !path.startsWith('/')) {
        path = '/' + path;
      }
      
      setCurrentPage(path);
      window.scrollTo(0, 0);
      
      if (path === '/admin-ankara-by-k' && !isAdminAuthenticated) {
        checkAdminAccess();
      }
    };

    window.addEventListener('hashchange', handleNavigation);
    handleNavigation();

    return () => window.removeEventListener('hashchange', handleNavigation);
  }, [isAdminAuthenticated]);

  const checkAdminAccess = () => {
    const password = prompt("Accès restreint. Veuillez entrer le code administrateur :");
    if (password === 'Amelée2026') {
      setIsAdminAuthenticated(true);
    } else {
      alert("Code incorrect. Accès refusé.");
      window.location.hash = '/'; 
    }
  };

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

  const isAdminPage = currentPage === '/admin-ankara-by-k';

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        {!isAdminPage && (
          <Header
            onCartClick={() => setIsCartOpen(true)}
            onSearchClick={() => {}}
          />
        )}

        <main className="flex-1">
          {renderPage()}
        </main>

        {!isAdminPage && <Footer />}

        {/* --- CORRECTION ICI : Ajout de onCheckout --- */}
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onCheckout={() => setIsPaymentOpen(true)} 
        />

        <PaymentModal
          isOpen={isPaymentOpen}
          onClose={() => setIsPaymentOpen(false)}
        />
      </div>
    </CartProvider>
  );
}

export default App;