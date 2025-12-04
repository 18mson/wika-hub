import { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import ProfilePage from './pages/ProfilePage';
import MapPage from './pages/MapPage';
import TransactionsPage from './pages/TransactionsPage';

type PageType = 'profile' | 'map' | 'transactions';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('profile');

  const getPageTitle = () => {
    switch (currentPage) {
      case 'profile':
        return 'Motor Profile';
      case 'map':
        return 'Charging Stations';
      case 'transactions':
        return 'Payment History';
      default:
        return '';
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'profile':
        return <ProfilePage />;
      case 'map':
        return <MapPage />;
      case 'transactions':
        return <TransactionsPage />;
      default:
        return <ProfilePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title={getPageTitle()} />
      <main className="pt-6 pb-20">
        {renderPage()}
      </main>
      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default App;
