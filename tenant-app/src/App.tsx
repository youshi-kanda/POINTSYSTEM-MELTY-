import React, { useState } from 'react';
import { TenantAuthProvider, useTenantAuth } from './contexts/TenantAuthContext';
import TenantLogin from './components/TenantLogin';
import TenantLayout from './components/TenantLayout';
import TenantDashboard from './components/TenantDashboard';
import SalesManagement from './components/SalesManagement';
import ReceiptGeneration from './components/ReceiptGeneration';
import PaymentHistory from './components/PaymentHistory';
import StoreSettings from './components/StoreSettings';
import './App.css';

const AppContent: React.FC = () => {
  const { user } = useTenantAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!user) {
    return <TenantLogin />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <TenantDashboard />;
      case 'sales':
        return <SalesManagement />;
      case 'receipts':
        return <ReceiptGeneration />;
      case 'payments':
        return <PaymentHistory />;
      case 'settings':
        return <StoreSettings />;
      default:
        return <TenantDashboard />;
    }
  };

  return (
    <TenantLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </TenantLayout>
  );
};

const App: React.FC = () => {
  return (
    <TenantAuthProvider>
      <AppContent />
    </TenantAuthProvider>
  );
};

export default App;
