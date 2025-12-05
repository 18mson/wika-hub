import { User, MapPin, Receipt, Siren } from 'lucide-react';

interface BottomNavProps {
  currentPage: 'profile' | 'map' | 'transactions' | 'sos';
  onPageChange: (page: 'profile' | 'map' | 'transactions' | 'sos') => void;
}

export default function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
        <button
          onClick={() => onPageChange('profile')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            currentPage === 'profile' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <User size={24} />
          <span className="text-xs mt-1 font-medium">Profile</span>
        </button>

        <button
          onClick={() => onPageChange('map')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            currentPage === 'map' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <MapPin size={24} />
          <span className="text-xs mt-1 font-medium">Charging</span>
        </button>

        <button
          onClick={() => onPageChange('sos')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            currentPage === 'sos' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Siren size={24} />
          <span className="text-xs mt-1 font-medium">SOS</span>
        </button>

        <button
          onClick={() => onPageChange('transactions')}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
            currentPage === 'transactions' ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Receipt size={24} />
          <span className="text-xs mt-1 font-medium">Transactions</span>
        </button>
      </div>
    </nav>
  );
}
